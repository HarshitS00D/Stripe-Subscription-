function saveCurrentUser(id, name) {
    sessionStorage.setItem("currentUser", JSON.stringify({
        id: id,
        name: name
    }));
}

function saveUser(user) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/register");
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.send(JSON.stringify(user));
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //saveCurrentUser(user.id, user.name)
            alert("Account Created");
        }
    }
}


function cancel() {
    window.location.href = "login.html";
}

function register() {
    error = 0;
    var nameInput = document.getElementById("Name");
    var emailInput = document.getElementById("Email");
    var passInput = document.getElementById("EnterPass");
    var confirmPassInput = document.getElementById("ConfirmPass");
    var mobileInput = document.getElementById("Mobile");
    var errName = document.getElementById("errName");
    var errEmail = document.getElementById("errEmail");
    var errEPass = document.getElementById("errEPass");
    var errCPass = document.getElementById("errCPass");
    var errMobile = document.getElementById("errMobile");

    if (nameInput.value == "") {
        errName.innerHTML = "Name is Required";
        error = 1;
    } else {
        if (!/^[a-zA-Z ]*$/.test(nameInput.value)) {
            errName.innerHTML = "Only Letters are allowed";
            error = 1;
        } else {
            errName.innerHTML = "";
            var name = nameInput.value;
        }
    }
    if (emailInput.value == "") {
        errEmail.innerHTML = "Email is Required";
        error = 1;
    } else {
        if (!/[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9._-]{3,}[.]{1}[a-zA-Z0-9._-]{2,}/.test(emailInput.value)) {
            errEmail.innerHTML = "Invalid Email Format";
            error = 1;
        } else {
            var email = emailInput.value;
            errEmail.innerHTML = "";
        }
    }
    if (passInput.value == "") {
        errEPass.innerHTML = "Password is Required";
        error = 1;
    } else {
        if (!/[a-zA-Z0-9._@]{8,}/.test(passInput.value)) {
            errEPass.innerHTML = "Invalid Password Format ( only '.' , '@' , '_' , a-z , A-z , 0-9 are allowed. Min Length = 8 )";
            error = 1;
        } else {
            errEPass.innerHTML = "";
            var tempPass = passInput.value;
        }
    }
    if (confirmPassInput.value == "") {
        errCPass.innerHTML = "Retype your Password";
        error = 1;
    } else {
        if (tempPass != confirmPassInput.value) {
            errCPass.innerHTML = "Password Mismatch";
            error = 1;
        } else {
            errCPass.innerHTML = "";
            var password = tempPass;
        }
    }
    if (mobileInput.value == "") {
        errMobile.innerHTML = "Mobile No. Required";
        error = 1;
    } else {
        if (!/[0-9]{10,11}/.test(mobileInput.value)) {
            errMobile.innerHTML = "Invalid Mobile Number";
            error = 1;
        } else {
            errMobile.innerHTML = "";
            var mobile = mobileInput.value;
        }
    }

    if (error == 0) {
        var user = new Object();
        user.name = name;
        user.email = email;
        user.password = password;
        user.mobile = mobile;

        // user.name = nameInput.value;
        // user.email = emailInput.value;
        // user.password = passInput.value;
        // user.mobile = mobileInput.value;

        saveUser(user);
    }

}