// Create tooltip element
const tooltip = document.createElement("div");
tooltip.id = "id-detector-tooltip";
tooltip.style.display = "none";
document.body.appendChild(tooltip);

// Track current highlighted element
let currentElement = null;

// Function to show tooltip
function showTooltip(element, id) {
  tooltip.textContent = id ? `ID: ${id}` : "No ID detected";
  tooltip.style.display = "block";

  // Position tooltip near the cursor
  const rect = element.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.top + window.scrollY - 35}px`;

  // Highlight the element
  currentElement = element;
  element.classList.add("id-detector-highlight");
}

// Function to hide tooltip
function hideTooltip(element) {
  tooltip.style.display = "none";
  if (element) {
    element.classList.remove("id-detector-highlight");
  }
  currentElement = null;
}

// Global mouseover handler to show ID of exact element being hovered
document.addEventListener("mouseover", (e) => {
  const target = e.target;

  // Skip if it's our tooltip
  if (target.id === "id-detector-tooltip") {
    return;
  }

  // Only update if we're hovering a different element
  if (currentElement !== target) {
    if (currentElement) {
      hideTooltip(currentElement);
    }
    // Show tooltip with ID if present, otherwise show "No ID detected"
    showTooltip(target, target.id || null);
  }
});

document.addEventListener("mouseout", (e) => {
  // Hide tooltip when leaving the element
  if (currentElement && e.target === currentElement) {
    hideTooltip(currentElement);
  }
});
// Clean up on page unload
window.addEventListener("beforeunload", () => {
  if (currentElement) {
    hideTooltip(currentElement);
  }
});
