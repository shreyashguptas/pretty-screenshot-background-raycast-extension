import sharp from "sharp";
import { showHUD } from "@raycast/api";
import { basename } from "path";

export async function beautifyScreenshot(
  screenshotPath: string,
  backgroundColor: string
) {
  try {
    const image = sharp(screenshotPath);
    const metadata = await image.metadata();
    
    // Add padding and background
    const result = await image
      .extend({
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
        background: backgroundColor
      })
      .toBuffer();

    // Save to a new file
    const newPath = screenshotPath.replace(
      basename(screenshotPath),
      `beautified-${basename(screenshotPath)}`
    );
    
    await sharp(result).toFile(newPath);
    await showHUD("Screenshot beautified! ✨");
  } catch (error) {
    await showHUD("Failed to process screenshot");
    console.error(error);
  }
} 