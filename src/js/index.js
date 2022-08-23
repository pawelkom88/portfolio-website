function innit() {
  const doodlesContainer = document.querySelector(".programming-doodles");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(entry.target.children).forEach(child => {
            child.classList.add("fadeIn");
          });
          const lastChild = entry.target.children[entry.target.children.length - 1];
          lastChild.classList.add("y");
        }
      });
    },
    {
      threshold: 0.7,
    }
  );

  observer.observe(doodlesContainer);

  // open modal after form submition
  const formBtn = document.querySelector(".form_btn");
  const form = document.querySelector(".contact__form-details");
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modal");

  overlay.addEventListener("click", e => {
    e.stopPropagation();
    overlay.style.display = "none";
  });

  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async response => {
        if (response.status == 200) {
          confetti();
          modal.style.display = "block";
          overlay.style.display = "block";
        } else {
          overlay.style.display = "block";

          // add modal error
        }
      })
      .catch(error => {
        // modal error
      })
      .then(function () {
        form.reset();
      });
  });

  // hide email from spam bots
  const email = document.querySelector(".reveal-email");

  email.addEventListener("click", () => {
    email.setAttribute("href", "mailto:pawel.komorkiewicz@yahoo.co.uk");
  });
}

innit();
