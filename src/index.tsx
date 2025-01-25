import { Detail, ActionPanel, Action, Icon, Color } from "@raycast/api";
import { useEffect, useState } from "react";
import { watchScreenshots } from "./utils/screenshot-watcher";
import { beautifyScreenshot } from "./utils/image-processor";

export default function Command() {
  const [latestScreenshot, setLatestScreenshot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Start watching for new screenshots
    const unwatch = watchScreenshots((path) => {
      setLatestScreenshot(path);
    });

    return () => {
      unwatch();
    };
  }, []);

  if (!latestScreenshot) {
    return (
      <Detail
        markdown="# Waiting for Screenshot...
        
Take a screenshot using Command+Shift+4 to begin."
      />
    );
  }

  return (
    <Detail
      markdown={`# Beautify Screenshot
      
![Screenshot Preview](${latestScreenshot})

Choose a background color to enhance your screenshot.`}
      actions={
        <ActionPanel>
          <Action
            title="Apply Blue Background"
            icon={Icon.Circle}
            onAction={() => beautifyScreenshot(latestScreenshot, "#0066FF")}
          />
          <Action
            title="Apply Red Background"
            icon={Icon.Circle}
            onAction={() => beautifyScreenshot(latestScreenshot, "#FF0000")}
          />
          {/* Add more color options */}
        </ActionPanel>
      }
    />
  );
} 