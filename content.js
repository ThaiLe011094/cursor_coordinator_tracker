// content.js - Injected into webpages to track cursor position
(function () {
    let coordBox = document.createElement("div");
    coordBox.style.position = "fixed";
    coordBox.style.background = "rgba(0, 0, 0, 0.7)";
    coordBox.style.color = "white";
    coordBox.style.padding = "5px 10px";
    coordBox.style.borderRadius = "5px";
    coordBox.style.fontSize = "14px";
    coordBox.style.pointerEvents = "none";
    coordBox.style.zIndex = "9999";
    coordBox.style.display = "none"; // Initially hidden
    document.body.appendChild(coordBox);

    let isActive = false;

    function toggleTracking() {
        isActive = !isActive;
        coordBox.style.display = isActive ? "block" : "none";
    }

    document.addEventListener("mousemove", (event) => {
        if (isActive) {
            coordBox.style.left = `${event.clientX + 10}px`;
            coordBox.style.top = `${event.clientY + 10}px`;
            coordBox.textContent = `X: ${event.clientX}, Y: ${event.clientY}`;
        }
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "toggle") {
            toggleTracking();
            sendResponse({ status: "toggled", isActive });
        }
    });
})();
