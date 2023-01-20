document
  .querySelector("#resetpassword-form")
  .addEventListener("submit", async e => {
    e.preventDefault();
    let first = document.querySelector("#resetpassword-1").value.trim();
    let second = document.querySelector("#resetpassword-2").value.trim();

    if (!first === second) {
      document.querySelector("#resetpassword-error").classList.remove("d-none");
      return;
    }
    try {
      let response = await supertokensEmailPassword.submitNewPassword({
        formFields: [
          {
            id: "password",
            value: second,
          },
        ],
      });
      if (response.status === "FIELD_ERROR") {
        response.formFields.forEach(formField => {
          if (formField.id === "password") {
            // New password did not meet password criteria on the backend.
            document
              .querySelector("#resetpassword-error-invalid")
              .classList.remove("d-none");
            document.querySelector("#resetpassword-1").value = "";
            document.querySelector("#resetpassword-2").value = "";
          }
          setTimeout(() => {
            document
              .querySelector("#resetpassword-error-invalid")
              .classList.add("d-none");
          }, 10000);
        });
      } else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
        document
          .querySelector("#resetpassword-error-expired-link")
          .classList.remove("d-none");
        window.location("/app/signin");
      } else {
        document
          .querySelector("#resetpassword-success")
          .classList.remove("d-none");
        setTimeout(() => {
          document
            .querySelector("#resetpassword-success")
            .classList.add("d-none");
          window.location = "/app/signin";
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  });
