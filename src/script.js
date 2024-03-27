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
      return response.json();
    })
    .then((data) => {
      console.log(data);
      disiplayShortenedUrl(data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
});

function disiplayShortenedUrl(data) {
  /* Create elements to be displayed on the screen */
  const newDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  const shortLink = document.createElement("p");
  const originalLink = document.createElement("p");
  const copyButton = document.createElement("button");

  /* Style the newly created elements */
  shortLink.style.color = "hsl(180, 66%, 49%)";
  newDiv.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; width:74%; background-color:white; border-radius:10px; padding:10px; padding-left:30px; padding-right:30px; margin-bottom";

  originalLink.textContent = `${data.data.url}`;
  shortLink.textContent = `${data.data.tiny_url}`;
  innerDiv.style.cssText =
    "display:flex; width:300px; justify-content:space-between; align-items:center;";
  copyButton.textContent = "Copy";
  copyButton.style.cssText =
    "background-color:hsl(180, 66%, 49%); border-radius:5px; padding:10px; padding-left:10px; padding-right:10px; color:white; border:none;";

  innerDiv.appendChild(shortLink);
  innerDiv.appendChild(copyButton);

  newDiv.appendChild(originalLink);
  newDiv.appendChild(innerDiv);
  linksDiv.appendChild(newDiv);
}
