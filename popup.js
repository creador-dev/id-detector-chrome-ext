const toggle = document.getElementById("toggleExtension");
const status = document.getElementById("status");
const errorMessage = document.getElementById("errorMessage");
const settingsContainer = document.getElementById("settingsContainer");
const showIdCheckbox = document.getElementById("showId");
const showClassCheckbox = document.getElementById("showClass");
const showTagCheckbox = document.getElementById("showTag");
const showDataCheckbox = document.getElementById("showData");
const showAllAttrsCheckbox = document.getElementById("showAllAttrs");

// Initialize UI - show settings by default
errorMessage.classList.remove("show");
settingsContainer.classList.remove("hidden");

// Check if current page is supported
function checkPageSupport() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url) {
      const url = tabs[0].url;
      console.log("Checking URL:", url);

      const unsupportedPatterns = [
        "chrome://",
        "chrome-extension://",
        "edge://",
        "about:",
        "view-source:",
        "https://chrome.google.com/webstore",
        "https://chromewebstore.google.com",
      ];

      const isUnsupported = unsupportedPatterns.some((pattern) =>
        url.startsWith(pattern)
      );

      console.log("Is unsupported:", isUnsupported);

      if (isUnsupported) {
        errorMessage.classList.add("show");
        settingsContainer.classList.add("hidden");
      } else {
        errorMessage.classList.remove("show");
        settingsContainer.classList.remove("hidden");
      }
    } else {
      console.log("No valid tab or URL found");
      // No valid tab or URL - show error
      errorMessage.classList.add("show");
      settingsContainer.classList.add("hidden");
    }
  });
}

// Check page support on load
checkPageSupport();

// Load saved state
chrome.storage.sync.get(
  ["enabled", "showId", "showClass", "showTag", "showData", "showAllAttrs"],
  (result) => {
    const isEnabled = result.enabled === true; // Default to false
    toggle.checked = isEnabled;
    updateStatus(isEnabled);

    // Load display options (default all to true)
    showIdCheckbox.checked = result.showId !== false;
    showClassCheckbox.checked = result.showClass !== false;
    showTagCheckbox.checked = result.showTag !== false;
    showDataCheckbox.checked = result.showData !== false;
    showAllAttrsCheckbox.checked = result.showAllAttrs === true; // Default to false
  }
);

// Handle toggle changes
toggle.addEventListener("change", (e) => {
  const isEnabled = e.target.checked;

  // Save state
  chrome.storage.sync.set({ enabled: isEnabled });

  // Update UI
  updateStatus(isEnabled);

  // Notify content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "toggleExtension",
          enabled: isEnabled,
        },
        (response) => {
          // Ignore errors for pages where content script isn't injected
          if (chrome.runtime.lastError) {
            // Silently handle the error
            return;
          }
        }
      );
    }
  });
});

// Handle display option changes
function handleDisplayOptionChange() {
  const options = {
    showId: showIdCheckbox.checked,
    showClass: showClassCheckbox.checked,
    showTag: showTagCheckbox.checked,
    showData: showDataCheckbox.checked,
    showAllAttrs: showAllAttrsCheckbox.checked,
  };

  // Save state
  chrome.storage.sync.set(options);

  // Notify content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "updateDisplayOptions",
          options: options,
        },
        (response) => {
          // Ignore errors for pages where content script isn't injected
          if (chrome.runtime.lastError) {
            // Silently handle the error
            return;
          }
        }
      );
    }
  });
}

showIdCheckbox.addEventListener("change", handleDisplayOptionChange);
showClassCheckbox.addEventListener("change", handleDisplayOptionChange);
showTagCheckbox.addEventListener("change", handleDisplayOptionChange);
showDataCheckbox.addEventListener("change", handleDisplayOptionChange);
showAllAttrsCheckbox.addEventListener("change", handleDisplayOptionChange);

function updateStatus(isEnabled) {
  if (isEnabled) {
    status.innerHTML = "Extension is <strong>enabled</strong>";
    status.className = "status";
  } else {
    status.innerHTML = "Extension is <strong>disabled</strong>";
    status.className = "status disabled";
  }
}
