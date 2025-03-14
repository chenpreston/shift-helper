# SHIFT Helper

[English](README.md) | [中文](README_zh.md) | [Deutsch](README_de.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Wikang Tagalog](README_tl.md) | [reo Māori](README_mi.md) | [हिन्दी](README_hi.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple, easy-to-use, open-source shift management tool designed specifically for Kinetic NZ Bus Tauranga drivers, helping them plan weekly shifts and add them to most calendar applications.

#### Features
1. **Multi-Depot Support**: Supports shifts for Greerton, Papamoa, Maleme, and Standby.
2. **School Holiday Mode**: Toggle the School Holiday switch to automatically adjust shift options.
3. **Public Holiday Mode**: Set any day as a Public Holiday to dynamically change its options.
4. **Batch Shift Scheduling**: For shifts repeating across multiple days, select dates together for synchronized scheduling.
5. **Calendar Export**: Generate an .ics file compatible with mainstream calendar apps (e.g., Google Calendar, Apple Calendar, Microsoft Outlook Calendar).
6. **Offline Availability**: PWA technology ensures use anytime, anywhere.

### How to Use
1. Select a Depot (e.g., Greerton).
2. Pick any day of the week to automatically display the shift view starting with Sunday.
3. Use the dropdown menu to set daily shifts, check boxes for batch synchronization, and toggle holiday options to adjust shifts.
4. Click “Add to Calendar” to generate an .ics file and import it into your calendar. iPhone Safari users can import directly without downloading.
5. Click “Send Feedback” to submit suggestions or report database errors; check “About” for version and update details.

### Installation
SHIFT Helper supports browser access and mobile installation, offering a PWA (Progressive Web App) experience. Below are step-by-step instructions for different devices:

#### Browser Access
- Open any modern browser (e.g., Chrome, Safari, Edge).
- Enter the URL: https://chenpreston.github.io/shift-helper-pwa/
- Start using it directly without additional installation.

#### Android Users
- **Steps**:
  1. Open the above URL in Chrome browser (recommended).
  2. Tap the “three-dot menu” in the top-right corner.
  3. Select “Add to Home Screen” or “Install App.”
  4. Confirm, and the app icon will appear on your home screen for use like a native app.
- **Calendar Import**:
  - After clicking “Add to Calendar,” download the .ics file.
  - Open the file (usually auto-linked to Google Calendar) and follow the prompts to import.
- **Note**: Supports offline use; a network connection is recommended for the latest data.

#### Apple Users (iPhone/iPad)
- **Steps**:
  1. Open the above URL in Safari browser (required for direct calendar import).
  2. Tap the “Share” icon at the bottom (a square with an upward arrow).
  3. Select “Add to Home Screen.”
  4. Confirm, and the app icon will appear on your home screen for use.
- **Calendar Import**:
  - After clicking “Add to Calendar”:
    - **Safari**: A calendar import prompt appears; follow it to add to Apple Calendar.
    - **Chrome**: Only downloads the .ics file, unable to import directly into Apple Calendar.
  - If you download the .ics file in Chrome, send it via email or AirDrop to open in Safari, or use a third-party app that supports .ics (e.g., Google Calendar App).
- **Important Notes**:
  - On Apple devices, Chrome and other non-Safari browsers cannot directly import .ics files into Apple Calendar. If you don’t usually use Safari, we recommend using Safari just once for the installation steps above. After installation, launching the app from the home screen will automatically use the Safari engine, allowing you to continue browsing the web with Chrome as usual.
  - Ensure your iOS system is updated to the latest version for the best experience.

### Data Source
Data is sourced from the latest Shift Card provided by the company (compiled as of January 2025). The calendar includes: shift number, sign-on time, sign-off time, meal location, meal duration, and gap duration.

### Technology
- **Frontend**: HTML, CSS, JavaScript
- **PWA**: Service Worker for offline caching
- **CSV Parsing**: PapaParse library
- **Open Source**: MIT License, source code available at [GitHub](https://github.com/chenpreston/shift-helper)