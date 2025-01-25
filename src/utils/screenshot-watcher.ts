import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export function watchScreenshots(callback: (path: string) => void): () => void {
  // Get the screenshots directory from system preferences if possible
  // Fallback to Desktop
  const screenshotDir = path.join(os.homedir(), "Desktop");
  
  const watcher = fs.watch(screenshotDir, (eventType, filename) => {
    if (filename && filename.match(/^Screenshot.*\.(png|jpg)$/i)) {
      callback(path.join(screenshotDir, filename));
    }
  });

  return () => watcher.close();
} 