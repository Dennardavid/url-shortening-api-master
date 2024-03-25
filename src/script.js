// My Api key
const tinyUrlApi =
  "FnrfUTcvOn1k5iXxUVBho9qqX75nQvA5jwyjfnbYQbZlmx8tqIBPOtlle6cP";

// API url
const apiURL = `https://api.tinyurl.com/create/`;

// Grabbing html Elements
let formElement = document.querySelector(".input-form");
const urlToShorten = document.querySelector("input");
const linksDiv = document.querySelector(".links_shortened");

/* Event listener on the form to wait for submit */
formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  /* Fetching the shortened url */
  fetch("https://api.tinyurl.com/create/", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tinyUrlApi}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: urlToShorten.value,
      domain: "tinyurl.com",
      description: "string",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to shorten URL");
      }
      console.log(response);
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error", error);
    });
});
