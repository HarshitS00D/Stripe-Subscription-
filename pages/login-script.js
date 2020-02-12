function login() {

    var email = document.getElementById("email").value;
    var errEmail = document.getElementById("errEmail");
    var errPass = document.getElementById("errPass");
    var password = document.getElementById("password").value;
    var error = 0;

    if (email == "") {
        errEmail.innerHTML = "Enter Email";
        errPass.innerHTML = "";
        error = 1;
    } else if (!/[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9._-]{3,}[.]{1}[a-zA-Z0-9._-]{2,}/.test(email)) {
        errEmail.innerHTML = "Invalid Email";
        errPass.innerHTML = "";
        error = 1;
    } else errEmail.innerHTML = "";

    if (password == "") {
        errPass.innerHTML = "Enter Password";
        error = 1;
    }
    else {
        errPass.innerHTML = "";
    }

    if (error == 0) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/login");
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify({ email, password }));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let res = xhttp.responseText;
                if (res === "false")
                    alert("Incorrect Credentials");
                else {
                    sessionStorage.setItem("id", res);
                    window.location.href = "home.html";
                }
            }
        }
    }
}