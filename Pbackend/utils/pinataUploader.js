// utils/pinataUploader.js
import pinataSDK from "@pinata/sdk";
import fs from "fs";
import dotenv from "dotenv";

// Load .env from project root
dotenv.config();

// --- Initialize Pinata using JWT (recommended method) ---
const pinata = new pinataSDK({
  pinataJWTKey: process.env.PINATA_JWT,
});

// --- Optional: Test authentication on startup ---
pinata
  .testAuthentication()
  .then((result) => {
    console.log("✅ Pinata Auth Success");
  })
  .catch((err) => {
    console.error("❌ Pinata Auth Failed:", err.message);
  });

// --- Upload file to IPFS via Pinata ---
export async function uploadToIPFS(filePath, fileName) {
  try {
    const readableStream = fs.createReadStream(filePath);

    const result = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: { name: fileName },
    });

    console.log("✅ Uploaded to IPFS:", result.IpfsHash);
    return result.IpfsHash;
  } catch (err) {
    console.error("❌ Pinata upload error:", err.message);
    throw err;
  }
}
