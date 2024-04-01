const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const scriptURL = 'https://script.google.com/macros/s/AKfycbyds9eqEWaQqJ0kUH0kBFJqGxfvMcJNIMb_vOgWXxgrBCqjXOGZD-jKHP7lCsdMnEG1pQ/exec';

form.addEventListener('submit', e => {
  submitButton.disabled = true
  e.preventDefault()
  let requestBody = new FormData(form)
  fetch(scriptURL, { method: 'POST', body: requestBody})
    .then(response => {
    document.getElementById("successMessage").textContent = "Form submitted successfully!";
    submitButton.disabled = false
      })
    .catch(error => {
    document.getElementById("successMessage").textContent = "Error submitting form!";
    submitButton.disabled = false
    }
    )
})