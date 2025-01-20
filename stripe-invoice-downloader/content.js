const checkForInvoiceLinks = () => {
  const links = document.querySelectorAll('a')

  links.forEach(link => {
    if (!link.dataset.processed) {
      link.dataset.processed = 'true'
      const invoiceUrl = link.href

      if (invoiceUrl.includes('pay.stripe.com/invoice')) {
        console.log('Found Stripe invoice link:', invoiceUrl)
        chrome.runtime.sendMessage({
          type: 'DOWNLOAD_INVOICE',
          url: invoiceUrl,
        })
      }
    }
  })
}

// Initial check when the script loads
checkForInvoiceLinks()

// Set up observer for dynamic content
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      checkForInvoiceLinks()
    }
  })
})

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true,
})
