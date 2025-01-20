chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'DOWNLOAD_INVOICE') {
    chrome.downloads.download({
      url: message.url,
      filename: `stripe-invoice-${new Date().toISOString().split('T')[0]}.pdf`,
      saveAs: false,
    })
  }
})
