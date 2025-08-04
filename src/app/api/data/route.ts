import deficoverModel from "@/model/deficover";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const PROTOCOLS = [
  {
    defisafety: "Nexus Mutual V2",
    defillama: "Nexus Mutual",
    nexus: 247,
  },
  {
    defisafety: "Euler V2",
    defillama: "Euler V2",
    nexus: 290,
  },
  {
    defisafety: "HyperLiquid",
    defillama: "Hyperliquid Bridge",
    nexus: 130,
  },
  {
    defisafety: "Eigan Layer",
    defillama: "EigenLayer",
    nexus: 106,
  },
  {
    defisafety: "Pendle",
    defillama: "Pendle",
    nexus: 128,
  },
  {
    defisafety: "AAVE V3",
    defillama: "AAVE V3",
    nexus: 97,
  },
  {
    defisafety: "AAVE V2",
    defillama: "AAVE V2",
    nexus: 2,
  },
  {
    defisafety: "Ensuro",
    defillama: "Ensuro",
    nexus: 240,
  },
  {
    defisafety: "Convex",
    defillama: "Convex Finance",
    nexus: 22,
  },
  {
    defisafety: "Ether.fi",
    defillama: "ether.fi Liquid",
    nexus: 167,
  },
  {
    defisafety: "GMX V2",
    defillama: "GMX V2 Perps",
    nexus: 125,
  },
  {
    defisafety: "Uniswap V3",
    defillama: "Uniswap V3",
    nexus: 72,
  },
  {
    defisafety: "Term Finance",
    defillama: "TermFinance Lend",
    nexus: 127,
  },
  {
    defisafety: "Balancer V2",
    defillama: "Balancer V2",
    nexus: 11,
  },
  {
    defisafety: "Liquity",
    defillama: "Liquity V1",
    nexus: 44,
  },
  {
    defisafety: "Aerodrome",
    defillama: "Aerodrome V1",
    nexus: 129,
  },
  {
    defisafety: "Moonwell",
    defillama: "Moonwell Lending",
    nexus: 183,
  },
  {
    defisafety: "Velodrome",
    defillama: "Velodrome V1",
    nexus: 124,
  },
  {
    defisafety: "Stakewise",
    defillama: "StakeWise V2",
    nexus: 117,
  },
  {
    defisafety: "1inch",
    defillama: "1inch Network",
    nexus: 1,
  },
];
// This endpoint should be called by a cron job service
export async function GET() {
  try {
    const data = await work();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing commissions:", error);
    return NextResponse.json(
      { error: "Failed to process commissions" },
      { status: 500 }
    );
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
const work = async () => {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI || "");

  let data = [];
  let offset = 0;
  while (1) {
    const response = await (
      await fetch(
        `https://defisafety.com/api/pqrs?offset=${offset}&order=DESC&orderBy=default&status=Active&title=`,
        {
          method: "GET",
        }
      )
    ).json();
    data.push(
      ...response.data
        .filter((v: any) =>
          PROTOCOLS.map((v) => v.defisafety).includes(v.title.trim())
        )
        .map((v: any) => ({
          title: v.title.trim(),
          score: v.finalScore,
          logo: v.imageUrl,
        }))
    );
    offset += response.data.length;
    if (response.data.length === 0) break;
  }
  let response = await (
    await fetch(`https://api.llama.fi/protocols`, { method: "GET" })
  ).json();
  const tvls = response
    .filter((v: any) => PROTOCOLS.map((v) => v.defillama).includes(v.name))
    .map((v: any) => {
      const title = PROTOCOLS.filter(
        (protocol) => protocol.defillama === v.name
      )[0].defisafety;
      return {
        title,
        tvl: v.tvl,
        url: v.url,
        category: v.category,
      };
    });
  data = data.map((v) => {
    const tvl = tvls.filter((t: any) => t.title === v.title)[0];
    return {
      ...v,
      tvl: tvl.tvl,
      url: tvl.url,
      category: tvl.category,
    };
  });

  response = await (
    await fetch(`https://api.nexusmutual.io/v2/capacity?period=30`, {
      method: "GET",
    })
  ).json();

  const ipis = response
    .filter((v: any) => PROTOCOLS.map((v) => v.nexus).includes(v.productId))
    .map((v: any) => {
      const title = PROTOCOLS.filter(
        (protocol) => protocol.nexus === v.productId
      )[0].defisafety;
      const coverage =
        Number(
          v.availableCapacity.filter(
            (cap: any) => cap.asset.symbol === "USDC"
          )[0].amount
        ) / 1000000;
      return {
        title,
        min: v.minAnnualPrice,
        max: v.maxAnnualPrice,
        coverage,
      };
    });
  data = data.map((v) => {
    const ipi = ipis.filter((t: any) => t.title === v.title)[0];
    return {
      ...v,
      min: ipi.min,
      max: ipi.max,
      coverage: ipi.coverage,
    };
  });
  deficoverModel.bulkWrite(
    data.map(({ title, ...fieldsToUpdate }) => ({
      updateOne: {
        filter: { title },
        update: { $set: fieldsToUpdate },
      },
    }))
  );
  return data;
};
