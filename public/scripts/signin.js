/* eslint-disable no-undef */
async function signInValues() {
    let email = document.querySelector("#Email").value.trim();
    let password = document.querySelector("#password").value.trim();

    return {
        email,
        password,
    };
}

document.querySelector("#signin-form").addEventListener("submit", async e => {
    e.preventDefault();

    document.querySelector("#signinButton").setAttribute("disabled", "disabled");
    document.querySelector("#signinCard").classList.remove("h-350");
    document.querySelector("#signinCard").classList.add("h-400");


    try {
        let values = await signInValues();
        let response = await supertokensEmailPassword.signIn({
            formFields: [{
                    id: "email",
                    value: await values.email,
                },
                {
                    id: "password",
                    value: await values.password,
                },
            ],
        });

        if ((await response.status) == "OK") {
            window.location.href = "/app/home";
            document
                .querySelector("#signinButton")
                .removeAttribute("disabled", "disabled");


        } else if ((await response.status) == "WRONG_CREDENTIALS_ERROR") {
            document
                .querySelector("#signinButton")
                .removeAttribute("disabled", "disabled");
            document.querySelector("#alert-bar-signin").classList.remove("d-none");

            setTimeout(() => {

                document
                    .querySelector("#alert-bar-signin")
                    .classList.remove("alert-bar-signin");

            }, 6000);
            setTimeout(() => {
                document
                    .querySelector("#alert-bar-signin")
                    .classList.add("alert-error-signin-out");
            }, 7000);

            setTimeout(() => {
                document.querySelector("#alert-bar-signin").classList.add("d-none");
                document
                    .querySelector("#alert-bar-signin")
                    .classList.add("alert-bar-signin");
                document
                    .querySelector("#alert-bar-signin")
                    .classList.remove("alert-error-signin-out");
                document.querySelector("#alert-bar-signin").classList.remove("d-flex");
            }, 8000);
        }
    } catch (error) {
        console.log(error);
    }
});

//forgotten password

document.querySelector("#forgotten-password").addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".alert-error").classList.add("d-none");
    document.querySelector("#alert-bar-signin").classList.remove("d-flex");
    document.querySelector("#signin-form").classList.add("d-none");
    document.querySelector("#signin-header").classList.add("d-none");
    document
        .querySelector("#forgottenpassowrd-header")
        .classList.remove("d-none");
    document.querySelector("#forgotten-form").classList.remove("d-none");
});

document
    .querySelector("#forgotten-form")
    .addEventListener("submit", async e => {
        e.preventDefault();
        let Email = document.querySelector("#forgottenEmail").value.trim();
        try {
            let response = await supertokensEmailPassword.sendPasswordResetEmail({
                formFields: [{
                    id: "email",
                    value: Email,
                }, ],
            });
            if (response.status === "FIELD_ERROR") {
                document
                    .querySelector("#forgotten-email-error")
                    .classList.remove("d-none");
            } else {
                document
                    .querySelector("#forgotten-email-success")
                    .classList.remove("d-none");
            }
        } catch (error) {
            console.log(error);
        }
    });

document.querySelector("#forgottenEmail").addEventListener("keyup", () => {
    let Email = document.querySelector("#forgottenEmail").value.trim();
    setTimeout(async() => {
        try {
            if (document.querySelector("#forgottenEmail").value.length > 5) {
                //check if password exit

                let verify = await supertokensEmailPassword.doesEmailExist({
                    email: Email,
                });
                if (!verify.doesExist) {
                    document
                        .querySelector("#forgotten-email-error")
                        .classList.remove("d-none");
                    document
                        .querySelector("#forgottenButton")
                        .setAttribute("disabled", "disabled");
                    return;
                }

                document
                    .querySelector("#forgotten-email-error")
                    .classList.add("d-none");
                document
                    .querySelector("#forgottenButton")
                    .removeAttribute("disabled", "disabled");

                return;
            }
        } catch (error) {
            console.log(error);
        }
    }, 3000);
});