import deficoverModel from "@/model/deficover";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
// This endpoint should be called by a cron job service
export async function GET() {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI || "");
    const data = await deficoverModel.find();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing commissions:", error);
    return NextResponse.json(
      { error: "Failed to process commissions" },
      { status: 500 }
    );
  }
}
