import sharp from "sharp";
import { showHUD } from "@raycast/api";
import * as path from "path";

interface ProcessingOptions {
  backgroundColor: string;
  padding: number;
  width?: number;
  height?: number;
}

export async function processScreenshot(
  inputPath: string,
  outputPath: string,
  options: ProcessingOptions
): Promise<void> {
  try {
    // Create a new Sharp instance
    const imageBuffer = await sharp(inputPath).toBuffer();
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    
    const width = options.width || metadata.width || 0;
    const height = options.height || metadata.height || 0;
    const totalWidth = width + (options.padding * 2);
    const totalHeight = height + (options.padding * 2);

    // Create background with padding
    const background = await sharp({
      create: {
        width: totalWidth,
        height: totalHeight,
        channels: 4,
        background: options.backgroundColor
      }
    }).toBuffer();

    // Composite the original image onto the background
    await sharp(background)
      .composite([
        {
          input: imageBuffer,
          top: options.padding,
          left: options.padding,
        },
      ])
      .png()
      .toFile(outputPath);
  } catch (error) {
    console.error('Error processing screenshot:', error);
    throw error;
  }
}

export async function beautifyScreenshot(
  screenshotPath: string,
  backgroundColor: string
): Promise<void> {
  try {
    const imageBuffer = await sharp(screenshotPath).toBuffer();
    const image = sharp(imageBuffer);
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
    
    await sharp(result)
      .png()
      .toFile(newPath);
      
    await showHUD("Screenshot beautified! ✨");
  } catch (error) {
    console.error("Error processing screenshot:", error);
    await showHUD("Failed to process screenshot");
  }
} 