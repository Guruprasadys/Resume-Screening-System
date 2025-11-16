// 📁 Pbackend/config/pinata.js
import pinataSDK from "@pinata/sdk";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const pinata = new pinataSDK({
  pinataJWTKey: process.env.PINATA_JWT,
});

export async function uploadToIPFS(filePath, fileName) {
  try {
    const readableStream = fs.createReadStream(filePath);
    const result = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: { name: fileName },
    });
    console.log("✅ Uploaded to IPFS:", result.IpfsHash);
    return result.IpfsHash;
  } catch (err) {
    console.error("❌ Pinata upload error:", err);
    throw err;
  }
}
