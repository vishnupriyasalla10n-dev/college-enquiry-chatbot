
function register() {
    let name = document.getElementById("reg-name").value;
    let email = document.getElementById("reg-email").value;
    let password = document.getElementById("reg-password").value;

    if (!name || !email || !password) {
        document.getElementById("message").textContent =
            "Please fill all fields.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        document.getElementById("message").textContent =
            "Email already registered.";
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
}

function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u =>
        u.email === email && u.password === password
    );

    if (user) {
        sessionStorage.setItem("loggedInStudent", JSON.stringify(user));
        window.location.href = "index.html";
    } else {
        document.getElementById("message").textContent =
            "Invalid email or password.";
    }
}
