/* eslint-disable no-undef */
let input = document.querySelector("#mobile-contact");

/* Initialising the phone number input field. */
let contact = window.intlTelInput(input, {
    // any initialisation options go
    utilsScript: "/app/scripts/utils.js",
    autoPlaceholder: true,
});


/**
 * It returns an object with the values of the input fields.
 * @returns An object with the properties firstName, otherNames, email, password, confirmPassword and
 * mobile.
 */

async function signUpValues() {
    let mobile = contact.getNumber();
    let country = contact.getSelectedCountryData().name;
    let firstName = document.querySelector("#first-name").value.trim();
    let otherNames = document.querySelector("#other-names").value.trim();
    let email = document.querySelector("#Email").value.trim();
    let password = document.querySelector("#password").value.trim();
    let confirmPassword = document
        .querySelector("#confirm-password")
        .value.trim();

    if (password != confirmPassword) {
        document.querySelector("#alert");
        document
            .querySelector("#password-error-message")
            .classList.remove("d-none");
        setTimeout(() => {
            document.querySelector("#password-error-message").classList.add("d-none");
        }, 10000);

        return;
    }


    return {
        firstName,
        otherNames,
        email,
        password,
        confirmPassword,
        mobile,
        country,
    };
}

//checking if email is valid
document.querySelector("#Email").addEventListener("keyup", () => {
    setTimeout(async() => {
        let email = document.querySelector("#Email");
        let emailErrorMaessage = document.querySelector("#email-error-message");
        let Email = document.querySelector("#Email").value.trim();

        try {
            let verify = await supertokensEmailPassword.doesEmailExist({
                email: Email,
            });

            if (await verify.doesExist) {
                let classList = emailErrorMaessage.classList;
                if (classList.value.split(" ").includes("d-none")) {
                    emailErrorMaessage.classList.remove("d-none");
                }

                return;
            }

            if (!emailErrorMaessage.classList.value.split(" ").includes("d-none")) {
                emailErrorMaessage.classList.add("d-none");
                email.style.borderColor = "#32de84";
            }
            email.style.borderColor = "#32de84";
        } catch (error) {
            console.log(error);
        }
    }, 4000);
});

document.querySelector("#password").addEventListener("keyup", () => {
    setTimeout(() => {
        if (document.querySelector("#password").value.length < 5) {
            document.querySelector("#password-message").classList.remove("d-none");
            document.querySelector("#password").style.borderColor = "red";
            return;
        }

        document.querySelector("#password-message").classList.add("d-none");
        document.querySelector("#password").style.borderColor = "#32de84";
    }, 3000);
});

//checking if confirmation password are correct
document.querySelector("#confirm-password").addEventListener("keyup", () => {
    setTimeout(() => {
        if (
            document.querySelector("#confirm-password").value.trim() !=
            document.querySelector("#password").value.trim()
        ) {
            document
                .querySelector("#password-error-message")
                .classList.remove("d-none");
            document.querySelector("#confirm-password").style.borderColor = "red";
            return;
        }
    }, 4000);

    document.querySelector("#password-error-message").classList.add("d-none");
    document.querySelector("#confirm-password").style.borderColor = "#32de84";
});

/* Preventing the form from submitting. */
document.querySelector("#signup-form").addEventListener("submit", async e => {
    e.preventDefault();
    if (
        document.querySelector("#confirm-password").value.trim() !=
        document.querySelector("#password").value.trim()
    ) {
        document
            .querySelector("#password-error-message")
            .classList.remove("d-none");
        document.querySelector("#confirm-password").style.borderColor = "red";
        return;
    }
    document.querySelector("#sigupButton").setAttribute("disabled", "disabled");

    try {
        let values = await signUpValues();

        // let formField =

        let response = await supertokensEmailPassword.signUp({
            formFields: [{
                    id: "email",
                    value: await values.email,
                },
                {
                    id: "password",
                    value: await values.password,
                },
                {
                    id: "firstName",
                    value: await values.firstName,
                },
                {
                    id: "lastName",
                    value: await values.otherNames,
                },
                {
                    id: "mobileContact",
                    value: await values.mobile,
                },
                {
                    id: "country",
                    value: await values.country,
                },
            ],
        });

        if ((await response.status) === "FIELD_ERROR") {
            // one of the input formFields failed validaiton
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    document.querySelector(".alert-bar").classList.remove("d-none");
                    document.querySelector(".alert-bar").classList.add("alert-error");
                    document.querySelector(".alert-bar").classList.add("d-flex");
                    document.querySelector(".error-alert").textContent += formField.error;
                    document
                        .querySelector("#signuploadinganimation")
                        .classList.add("d-none");
                    setTimeout(() => {
                        document.querySelector(".alert-bar").classList.add("d-none");

                    }, 10000)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    document
                        .querySelector("#signuploadinganimation")
                        .classList.add("d-none");
                }
            });
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            document.querySelector("#sigupButton").removeAttribute("disabled", "disabled");
            window.location.href = "/app/signin";
        }
    } catch (error) {
        console.log(error);
    }
});