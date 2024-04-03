const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const loader = document.querySelector("#loader") 
const scriptURL = 'https://script.google.com/macros/s/AKfycbyds9eqEWaQqJ0kUH0kBFJqGxfvMcJNIMb_vOgWXxgrBCqjXOGZD-jKHP7lCsdMnEG1pQ/exec';

form.addEventListener('submit', e => {
  loader.style.display = "block";
  submitButton.style.display ="none"
  e.preventDefault()
  let requestBody = new FormData(form)
  fetch(scriptURL, { method: 'POST', body: requestBody})
    .then(response => {
      document.getElementById("successMessage").textContent = "Form submitted successfully!";
      loader.style.display = "none";
      submitButton.style.display ="block"
    })
    .catch(error => {
      document.getElementById("successMessage").textContent = "Error submitting form!";
      loader.style.display = "none";
      submitButton.style.display ="block"
    });
});
