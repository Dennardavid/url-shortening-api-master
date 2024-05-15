// My Api key
const tinyUrlApi = config.TINYURL_API_KEY;

// API url
const apiURL = `https://api.tinyurl.com/create/`;

// Grabbing html Elements
let formElement = document.querySelector(".input-form");
const urlToShorten = document.querySelector(".input");
const linksDiv = document.querySelector(".links_shortened");
const wrongUrl = document.querySelector("#wrong_url");

/* Regex for form validation */
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

/* Function to save links to localStorage */
function saveLinks(links) {
  localStorage.setItem("shortenedLinks", JSON.stringify(links));
}

/* Function to load links from localStorage */
function loadLinks() {
  const links = localStorage.getItem("shortenedLinks");
  return links ? JSON.parse(links) : [];
}

/* Function to render a single link */
function renderLink(data) {
  /* Create elements to be displayed on the screen */
  const newDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  const shortLink = document.createElement("p");
  const originalLink = document.createElement("p");
  const copyButton = document.createElement("button");

  /* Style the newly created elements */
  shortLink.style.color = "hsl(180, 66%, 49%)";
  newDiv.setAttribute("class", "new_div");

  originalLink.textContent = `${data.url}`;
  shortLink.textContent = `${data.tiny_url}`;

  innerDiv.setAttribute("class", "inner_div");
  copyButton.textContent = "Copy";
  copyButton.setAttribute("class", "copy_button");

  innerDiv.appendChild(shortLink);
  innerDiv.appendChild(copyButton);

  newDiv.appendChild(originalLink);
  newDiv.appendChild(innerDiv);
  linksDiv.appendChild(newDiv);

  gsap.from(newDiv, { opacity: 0, y: 20, duration: 0.8 });

  /* Event listener for copy button */
  copyButton.addEventListener("click", function () {
    // Revert all buttons
    document.querySelectorAll(".copy_button").forEach((btn) => {
      btn.textContent = "Copy";
      btn.style.backgroundColor = "";
    });
    // Set this button to copied state
    copyButton.textContent = "Copied!";
    copyButton.style.backgroundColor = "hsl(257, 27%, 26%)";

    // Copy the shortened URL to clipboard
    navigator.clipboard.writeText(shortLink.textContent);

    // Revert the button to its original state after 10 seconds
    setTimeout(() => {
      copyButton.textContent = "Copy";
      copyButton.style.backgroundColor = "";
    }, 5000); // 10 seconds
  });
}

/* Function to validate and fetch Url from the form */
function validateUrlAndFetch(event) {
  event.preventDefault(); // Prevent default form submission

  /* Trim the URL to remove white spaces before and after */
  const url = urlToShorten.value.trim();

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

  /* Fetching the shortened URL */
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
      const linkData = {
        url: data.data.url,
        tiny_url: data.data.tiny_url,
      };
      renderLink(linkData);
      const links = loadLinks();
      links.push(linkData);
      saveLinks(links);
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

/* Event listener on the form to wait for submit */
formElement.addEventListener("submit", function (event) {
  /* URL validation */
  validateUrlAndFetch(event);
});

/* Load and display links on page load */
document.addEventListener("DOMContentLoaded", function () {
  const links = loadLinks();
  links.forEach(renderLink);
});
