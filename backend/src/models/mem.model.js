import { Schema, model } from "mongoose";
import { customAlphabet } from "nanoid";

const memSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
    shareableLink: { type: String, unique: true }, // stores only the token
  },
  { timestamps: true }
);

const generateShortToken = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 10);

memSchema.methods.generateNewShareableLink = async function () {
  let token, existingMem;
  do {
    token = generateShortToken(); // 10-character Base62 token
    existingMem = await this.constructor.findOne({ shareableLink: token });
  } while (existingMem);
  this.shareableLink = token; // Store only the token
  return this.save();
};

export const Mem = model("Mem", memSchema);