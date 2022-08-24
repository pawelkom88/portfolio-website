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
  const modalCloseBtn = document.querySelector(".close-btn");
  const loaderModal = document.querySelector(".modal2");

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modal.style.display = "none";
      overlay.style.display = "none";
    }
  });

  modalCloseBtn.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", e => {
    e.stopPropagation();
    overlay.style.display = "none";
    modal.style.display = "none";
  });

  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    const json = JSON.stringify(object);
    loaderModal.style.display = "block";
    overlay.style.display = "block";

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
          loaderModal.style.display = "none";
          modal.style.display = "block";
          confetti({particleCount: 300, spread: 360});
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
