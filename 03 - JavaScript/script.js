// Creating a user registration form
uname = document.getElementById("username");
pass = document.getElementById("password");
confirm = document.getElementById("confirm-password");


form = document.getElementById("form");
button = document.getElementById("submit");

button.addEventListener("click", function (e) {
    e.preventDefault(); // stop the default action of the form submission by a browser
    if (uname.value === "" || pass.value === "" || confirm.value === "") {
        alert("Please fill in all fields");
    }
    if (uname.value.length < 5) {
        alert("Username must be at least 5 characters long");
    }
    if (pass.value !== confirm.value) {
        alert("Passwords do not match");
    }   
    if (pass.value.length < 8) {
        alert("Password must be at least 8 characters long");
    }
    if(uname.value.length >=5 && pass.value == confirm.value && pass.value.length>=8){
        console.log("Registration successful");
        window.location.href = "dynamic_content.html";
    }
    form.reset();
});