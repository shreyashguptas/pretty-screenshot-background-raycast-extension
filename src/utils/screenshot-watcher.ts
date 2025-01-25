import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export function watchScreenshots(callback: (path: string) => void): () => void {
  // Get the macOS screenshots directory
  const defaultScreenshotDir = path.join(os.homedir(), 'Desktop');
  // Try to read the custom screenshot location from macOS preferences
  const customScreenshotDir = getCustomScreenshotLocation();
  const screenshotDir = customScreenshotDir || defaultScreenshotDir;
  
  console.log(`Watching for screenshots in: ${screenshotDir}`);
  
  const watcher = fs.watch(screenshotDir, (eventType, filename) => {
    if (eventType === 'rename' && filename && isScreenshot(filename)) {
      // Wait a brief moment to ensure the file is fully written
      setTimeout(() => {
        const fullPath = path.join(screenshotDir, filename);
        if (fs.existsSync(fullPath)) {
          callback(fullPath);
        }
      }, 100);
    }
  });

  return () => watcher.close();
}

function isScreenshot(filename: string): boolean {
  // macOS screenshot format: "Screenshot YYYY-MM-DD at HH.MM.SS.png"
  const screenshotPattern = /^Screenshot \d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2}.*\.(png|jpg)$/;
  return screenshotPattern.test(filename);
}

function getCustomScreenshotLocation(): string | null {
  try {
    // Try to read from macOS preferences
    const { execSync } = require('child_process');
    const cmd = 'defaults read com.apple.screencapture location';
    const output = execSync(cmd, { encoding: 'utf8' }).trim();
    return output || null;
  } catch {
    return null;
  }
} 