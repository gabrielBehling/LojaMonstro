const loginForm = document.querySelector(".login-form");
      const signupForm = document.querySelector(".signup-form");
      const toggleForms = document.querySelectorAll(".toggle-form");

      toggleForms.forEach((toggle) => {
        toggle.addEventListener("click", () => {
          loginForm.classList.toggle("active");
          signupForm.classList.toggle("active");
        });
      });