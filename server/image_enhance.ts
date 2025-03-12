"use server";

import { v2 as cloudinary } from "cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "deozxxtax",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const enhanceSchema = z.object({
  activeImage: z.string().url(),
});

async function checkImageProcessing(url: string) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
}

export const enhanceImage = actionClient
  .schema(enhanceSchema)
  .action(async ({ parsedInput: { activeImage } }) => {
    try {
      if (!activeImage.includes("/upload/")) {
        throw new Error("Invalid image URL");
      }

      const parts = activeImage.split("/upload/");
      const enhancedUrl = `${parts[0]}/upload/e_improve/${parts[1]}`;

      let isProcessed = false;
      const maxAttempts = 20;
      const delay = 1000; // 1-second delay between checks

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        isProcessed = await checkImageProcessing(enhancedUrl);
        if (isProcessed) break;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      if (!isProcessed) {
        throw new Error("Image enhancement timed out");
      }

      console.log("Enhanced Image URL:", enhancedUrl);
      return enhancedUrl; // ✅ Return as a string instead of an object
    } catch (error) {
      console.error("Enhancement error:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  });
