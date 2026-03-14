const username = document.querySelector("#username");
const password = document.querySelector("#password");
const button = document.querySelector("#logingbtn");
const defaultUser = "admin";
const defaultpass = "admin123";

button.addEventListener("click", () => {
    const usernameValue = username.value;
    const passwordValue = password.value;

    if (usernameValue === defaultUser) {

        checkpass(passwordValue);

    }

    else {

        console.log("your entered wrong username, please try again");
    }



})

// checkpass and redirect


function checkpass(userpass) {

    if (userpass === defaultpass) {

        window.location.href = "home.html";
    }

    else {

        console.log("password is wrong");
    }


}
