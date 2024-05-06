// My Api key
const tinyUrlApi =
  "FnrfUTcvOn1k5iXxUVBho9qqX75nQvA5jwyjfnbYQbZlmx8tqIBPOtlle6cP";

// API url
const apiURL = `https://api.tinyurl.com/create/`;

// Grabbing html Elements
let formElement = document.querySelector(".input-form");
const urlToShorten = document.querySelector(".input");
const linksDiv = document.querySelector(".links_shortened");
const wrongUrl = document.querySelector("#wrong_url");

/* Regex for form validation */
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

/* function to validate and fetch Url from the form */
function validateUrlAndFetch(event) {
  event.preventDefault(); // Prevent default form submission

  /* Trim the URL to remove white spaces before and after*/
  const url = urlToShorten.value.trim();

  // Regular expression to validate URL format
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  /* Form validation conditional */
  if (!urlRegex.test(url)) {
    wrongUrl.innerHTML = "Please add a valid URL/link";
    wrongUrl.style.cssText = "color: red; font-size:13px; font-style:italic;";
    urlToShorten.style.cssText = "border: 2px solid red";
    return; // Prevent form submission if URL is invalid
  } else {
    wrongUrl.innerHTML = "";
    wrongUrl.style.cssText = "";
    urlToShorten.style.cssText = "border: 1px solid hsl(180, 66%, 49%)";
  }

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

  /* Create elements to be displayed on the screen */
  const newDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  const shortLink = document.createElement("p");
  const originalLink = document.createElement("p");
  const copyButton = document.createElement("button");

  /* Function to display the shortened URLS  */
  function disiplayShortenedUrl(data) {
    /* Style the newly created elements */
    shortLink.style.color = "hsl(180, 66%, 49%)";
    newDiv.setAttribute("class", "new_div");

    originalLink.textContent = `${data.data.url}`;
    shortLink.textContent = `${data.data.tiny_url}`;

    innerDiv.setAttribute("class", "inner_div");
    copyButton.textContent = "Copy";
    copyButton.setAttribute("class", "copy_button");

    innerDiv.appendChild(shortLink);
    innerDiv.appendChild(copyButton);

    newDiv.appendChild(originalLink);
    newDiv.appendChild(innerDiv);
    linksDiv.appendChild(newDiv);
  }

  copyButton.addEventListener("click", function () {
    copyButton.textContent = "Copied!";
    copyButton.style.backgroundColor = "hsl(257, 27%, 26%)";
  });
}

/* Event listener on the form to wait for submit */
formElement.addEventListener("submit", function (event) {
  /* URL validation */
  validateUrlAndFetch(event);
});
