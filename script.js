const quote = document.getElementById("quote");
const author = document.getElementById("author");

// const api_url = "https://api.quotable.io/random" //not working
const api_url = "https://dummyjson.com/quotes/random"

async function getQuote(url) {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    quote.innerHTML = data.quote;
    author.innerHTML = data.author;
}
getQuote(api_url);