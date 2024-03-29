// i did it this way because it redirects to formspree.io page and i did this method to prevent the redirect
function submitForm(event) {
    event.preventDefault(); 
    var form = document.getElementById('contactForm');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formspree.io/f/myyrnpkl', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    successMessage.innerHTML = 'Form submitted successfully!';
    xhr.send(new URLSearchParams(formData));
    form.reset();
  }