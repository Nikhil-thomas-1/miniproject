document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const companyID = document.getElementById("companyID").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: companyID, password }) // Assuming `companyID` is actually the email
        });

        const data = await response.json();

        if (response.ok) {
            // Store JWT token in localStorage
            localStorage.setItem("token", data.token);

            // Redirect to the dashboard
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Invalid Company ID or Password. Please try again.");
        }
    } catch (error) {
        alert("Server error. Please try again later.");
        console.error("Login Error:", error);
    }
});
