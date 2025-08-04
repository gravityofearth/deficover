import mongoose from "mongoose";

const deficoverSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    tvl: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    min: {
      type: String,
      required: true,
    },
    max: {
      type: String,
      required: true,
    },
    coverage: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const deficoverModel =
  mongoose.models.Deficover || mongoose.model("Deficover", deficoverSchema);
export default deficoverModel;
