function submitForm(e) {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
  }
  
  document.getElementById("darkToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });