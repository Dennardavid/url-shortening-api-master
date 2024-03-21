const apiURL = "https://cleanuri.com/api/v1/shorten";

let formElement = document.querySelector(".input-form");
const urlToShorten = document.querySelector("input").value;

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch(apiURL, {
    method: "POST",
    headers: {
      Accept: "application / json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: urlToShorten }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Failed to shorten URL");
      }
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.error("Error", error);
    });
});
