# Web Crawler

A web crawler built with Node.js that recursively crawls websites while maintaining proper URL normalization and handling both relative and absolute URLs.

## 🚀 Features

- **Recursive Web Crawling**: Automatically discovers and crawls all pages within a domain
- **URL Normalization**: Ensures consistent URL handling and prevents duplicate crawling
- **Smart URL Processing**: Handles both relative and absolute URLs
- **Error Handling**: Robust error handling for failed requests and invalid URLs
- **Content Type Validation**: Ensures only HTML content is processed
- **External Link Detection**: Prevents crawling of external domains

## 🛠️ Technical Implementation

- Built with modern JavaScript (Node.js)
- Implements async/await for efficient asynchronous operations
- Utilizes native `URL` API for URL parsing and normalization
- Includes comprehensive error handling and logging

## 📋 Prerequisites

- Node.js (version specified in .nvmrc)
- npm (comes with Node.js)

## 💡 Key Technical Features

- **URL Normalization**: Implements custom URL normalization to ensure consistent crawling
- **Recursive Crawling**: Uses recursive functions for depth-first crawling
- **Content Validation**: Validates HTTP status codes and content types
- **Memory Management**: Efficient tracking of visited pages using a map structure
- **Error Resilience**: Graceful handling of network errors and invalid URLs
