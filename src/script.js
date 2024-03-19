const apiURL = "https://cleanuri.com/api/v1/shorten";
const submitButton = document.querySelector(".submit");
const formData = new FormData(document.querySelector(".input-form"));

submitButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const request = await fetch(apiURL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
  const response = await request.json();
  console.log(...response);
});
