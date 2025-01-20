# Stripe Invoice Auto-Downloader

A Chrome extension that automatically downloads Stripe invoices from any webpage that contains Stripe invoice links.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `stripe-invoice-downloader` folder

## Features

- Works on any webpage that contains Stripe invoice links
- Automatically detects and downloads invoice PDFs
- Works with dynamically loaded content
- Saves invoices with date-stamped filenames
- Console logging for tracking detected invoice links

## Usage

The extension will automatically scan any webpage you visit for Stripe invoice links (pay.stripe.com/invoice/*). When it finds such links, it will automatically download the corresponding invoice PDFs.

You can check the browser's console (Developer Tools > Console) to see which invoice links are being detected. 