const quote = document.getElementById("quote");
const author = document.getElementById("author");

const api_url = "https://dummyjson.com/quotes/random";

async function getQuote(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        quote.textContent = data.quote;
        author.textContent = data.author;
    } catch (error) {
        console.error("Failed to fetch quote:", error);
        quote.textContent = "Error fetching quote.";
        author.textContent = "";
    }
}

async function copyQuote() {
    const textToCopy = quote.innerText;
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(textToCopy);
            console.log("Quote copied!");
        } catch (err) {
            console.error("Copy failed:", err);
        }
    } else {
        console.warn("Clipboard not supported or insecure context");
    }
}

getQuote(api_url);