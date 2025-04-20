document.getElementById("toggle").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        }, () => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggle" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.warn("Content script not ready yet.");
                } else {
                    console.log("Toggle response:", response);
                }
            });
        });
    });
});
