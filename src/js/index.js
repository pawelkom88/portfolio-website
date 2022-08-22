// open modal
const formBtn = document.querySelector(".form_btn");

// hide email from spam bots
const email = document.querySelector(".reveal-email");

email.addEventListener("click", () => {
  email.setAttribute("href", "mailto:pawel.komorkiewicz@yahoo.co.uk");
});
