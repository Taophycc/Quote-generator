document.addEventListener("DOMContentLoaded", function () {
  const quote = document.getElementById("quote");
  const quoteAuthor = document.getElementById("author");
  const newQuoteBtn = document.getElementById("new-quote");
  const quoteContainer = document.getElementById("quote-container");
  const twitterBtn = document.getElementById("twitter");
  const loader = document.getElementById("loader");

  let quotes = [];

  // Show Loading
  function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }

  // Hide loading
  function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }

  async function loadQuotes() {
    loading();
    try {
      const response = await fetch("quotes.json");
      if (!response.ok) throw new Error("Failed to load quotes");
      quotes = await response.json();
      displayRandomQuote();
    } catch (error) {
      quote.textContent = "Failed to load quotes.";
      console.error(error);
    }
  }

  function displayRandomQuote() {
    loading();
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteData = quotes[randomIndex];
    if (quoteData.quote.length > 50) {
      quote.classList.add("long-quote");
    } else {
      quote.classList.remove("long-quote");
    }
    quote.textContent = quoteData.quote;

    // Set Quote, Hide Loader
    quoteAuthor.textContent = `-${quoteData.author}`;
    complete();
  }

  // Tweet quote
  function tweetQuote() {
    const twitterUrl = `https://x.com/intent/post?text=${quote.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, "_blank");
  }

  //Event Listeners
  newQuoteBtn.addEventListener("click", displayRandomQuote);
  twitterBtn.addEventListener("click", tweetQuote);

  // On Load
  loadQuotes();
});
