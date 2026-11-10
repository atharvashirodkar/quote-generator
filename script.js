const quote = document.getElementById("quote");
const author = document.getElementById("author");
const status = document.getElementById("status");

const newQuoteButton = document.getElementById("new-quote");
const copyQuoteButton = document.getElementById("copy-quote");

const apiUrl = "https://dummyjson.com/quotes/random";

let currentQuote = "";
let currentAuthor = "";


async function getQuote() {
    newQuoteButton.disabled = true;
    quote.setAttribute("aria-busy", "true");
    status.textContent = "";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (
            typeof data.quote !== "string" ||
            typeof data.author !== "string"
        ) {
            throw new Error("The quote response had an unexpected format.");
        }

        currentQuote = data.quote;
        currentAuthor = data.author;

        quote.textContent = currentQuote;
        author.textContent = currentAuthor;

        copyQuoteButton.disabled = false;

    } catch (error) {
        console.error("Failed to fetch quote:", error);

        status.textContent =
            "Unable to load a quote. Check your connection and try again.";

    } finally {
        quote.setAttribute("aria-busy", "false");
        newQuoteButton.disabled = false;
    }
}


async function copyQuote() {
    if (!currentQuote) {
        status.textContent = "Load a quote before copying.";
        return;
    }

    const textToCopy = currentAuthor
        ? `${currentQuote}\n— ${currentAuthor}`
        : currentQuote;

    if (!navigator.clipboard || !window.isSecureContext) {
        status.textContent =
            "Copying requires a secure browser connection.";
        return;
    }

    try {
        await navigator.clipboard.writeText(textToCopy);

        status.textContent = "Quote and author copied.";

    } catch (error) {
        console.error("Failed to copy quote:", error);

        status.textContent =
            "Could not copy the quote. Try again.";
    }
}


// Event listeners
newQuoteButton.addEventListener("click", getQuote);

copyQuoteButton.addEventListener("click", copyQuote);


// Generate initial quote
getQuote();