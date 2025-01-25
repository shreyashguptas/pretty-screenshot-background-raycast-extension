import { watch } from "fs";
import { homedir } from "os";
import { join } from "path";

export function watchScreenshots(callback: (path: string) => void) {
  const screenshotDir = join(homedir(), "Desktop"); // Default macOS screenshot location
  
  const watcher = watch(screenshotDir, (eventType, filename) => {
    if (filename && filename.match(/^Screenshot.*\.(png|jpg)$/)) {
      callback(join(screenshotDir, filename));
    }
  });

  return () => watcher.close();
} 