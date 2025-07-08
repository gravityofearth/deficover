import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

export async function POST(request: NextRequest): Promise<Response> {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file found" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI || "");

  const db = mongoose.connection.db;
  if (!db) return NextResponse.json({ success: false, filename: file.name });
  const bucket = new GridFSBucket(db, { bucketName: "uploads" });

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(file.name, {
      contentType: file.type,
    });

    uploadStream.end(buffer);

    uploadStream.on("error", (error) => {
      reject(NextResponse.json({ error: error.message }, { status: 500 }));
    });

    uploadStream.on("finish", () => {
      // uploadStream.id is the ObjectId of the uploaded file
      const fileId = uploadStream.id.toString(); // convert ObjectId to string

      resolve(
        NextResponse.json(
          { success: true, fileId, filename: file.name },
          { status: 201 }
        )
      );
    });
  });
}
