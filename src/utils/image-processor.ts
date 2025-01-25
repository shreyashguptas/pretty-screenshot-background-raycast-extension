import * as sharp from "sharp";
import { showHUD } from "@raycast/api";
import * as path from "path";

export async function beautifyScreenshot(
  screenshotPath: string,
  backgroundColor: string
): Promise<void> {
  try {
    const image = sharp(screenshotPath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error("Could not read image dimensions");
    }

    // Calculate padding (20% of the largest dimension)
    const padding = Math.max(metadata.width, metadata.height) * 0.2;
    
    // Add padding and background
    const result = await image
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: backgroundColor
      })
      .toBuffer();

    // Save to a new file in the same directory
    const dir = path.dirname(screenshotPath);
    const newPath = path.join(dir, `beautified-${path.basename(screenshotPath)}`);
    
    await sharp(result).toFile(newPath);
    await showHUD("Screenshot beautified! ✨");
  } catch (error) {
    console.error("Error processing screenshot:", error);
    await showHUD("Failed to process screenshot");
  }
} 