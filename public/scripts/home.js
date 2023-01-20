/* eslint-disable no-undef */
document
    .querySelector("#logout")
    .addEventListener("click", async function logout() {
        try {
            await supertokensSession.signOut();
            window.location.href = "/app/signin";
        } catch (error) {
            console.log(error);
        }
    });