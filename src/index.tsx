import { Detail, ActionPanel, Action, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { watchScreenshots } from "./utils/screenshot-watcher";
import { beautifyScreenshot } from "./utils/image-processor";

// React is automatically available in Raycast extensions
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
      
![Screenshot Preview](file://${latestScreenshot})

Choose a background color to enhance your screenshot.`}
      actions={
        <ActionPanel>
          <Action
            title="Apply Blue Background"
            icon={Icon.Circle}
            onAction={async () => {
              setIsProcessing(true);
              await beautifyScreenshot(latestScreenshot, "#0066FF");
              setIsProcessing(false);
            }}
          />
          <Action
            title="Apply Red Background"
            icon={Icon.Circle}
            onAction={async () => {
              setIsProcessing(true);
              await beautifyScreenshot(latestScreenshot, "#FF0000");
              setIsProcessing(false);
            }}
          />
          {/* Add more color options */}
        </ActionPanel>
      }
    />
  );
} 