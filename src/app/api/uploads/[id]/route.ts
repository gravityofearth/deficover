import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { GridFSBucket, ObjectId } from "mongodb";
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET(_: Request, context: any) {
  const { id } = context.params;
  if (!id) {
    return new NextResponse("id is required", { status: 400 });
  }

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI || "");

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db!, { bucketName: "uploads" });

    // Find the file info by filename
    const files = await bucket.find({ _id: new ObjectId(id) }).toArray();
    if (!files || files.length === 0) {
      return new NextResponse("File not found", { status: 404 });
    }
    const file = files[0];
    // await bucket.delete(file._id);
    // return new NextResponse("OK");
    // Create a readable stream from GridFS
    const downloadStream = bucket.openDownloadStream(new ObjectId(id));

    // Return a streaming response with correct content-type
    return new NextResponse(downloadStream as any, {
      headers: {
        "Content-Type": file.contentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${file.filename}"`,
      },
    });
  } catch (error) {
    console.error("Error streaming file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
