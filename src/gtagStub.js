// gtag.js is often missing in local preview or when an ad blocker
// strips Google's script. The Docusaurus plugin still calls window.gtag
// on each page change and crashes without this stub.
if (typeof window !== 'undefined') {
    if (typeof window.gtag !== 'function') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
    }
}
