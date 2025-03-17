document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const companyID = document.getElementById("companyID").value;
    const password = document.getElementById("password").value;

    // Predefined Company ID and Password
    const validCompanyID = "AXIO123";
    const validPassword = "AXIO@2024";

    if (companyID === validCompanyID && password === validPassword) {
        window.location.href="dashboard.html";      
    } else {
        alert("Invalid Company ID or Password. Please try again.");
    }
});