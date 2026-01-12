# Installation Instructions

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top right corner
3. Click "Load unpacked"
4. Select the extension directory (`element-inspector`)
5. The extension should now be loaded and active

## Using the Extension

- Navigate to any webpage
- Hover over any HTML element
- A tooltip will appear showing the element's details based on your display options
- The element will be highlighted with a blue outline
- Move your mouse away to remove the highlight and tooltip
- Click the extension icon to configure display options

## Features

- **Display Options**: Choose what information to show
  - Element ID
  - Class names
  - HTML tag name
  - Data attributes (data-\*)
  - All other attributes
- **Toggle On/Off**: Easily enable or disable the extension
- **Real-time Updates**: Works with dynamically loaded content
- **Clean Interface**: Non-intrusive tooltip with multiline display
- **Visual Highlighting**: Blue outline shows the inspected element

## Display Options

Click the extension icon in your toolbar to access the popup and configure:

- **Show ID**: Display element's ID attribute
- **Show Class Name**: Display element's classes
- **Show Tag Name**: Display HTML tag (e.g., `<div>`, `<button>`)
- **Show Data Attributes**: Display all data-\* attributes
- **Show All Attributes**: Display all other HTML attributes

## Notes

- The extension works on all websites
- Settings are saved across browser sessions
- Only attributes that exist are shown (no "none" messages)
