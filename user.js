// Initialize EmailJS with your user ID
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace with your EmailJS public key

document.getElementById("fundForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    const mobile = document.getElementById("mobile").value.trim();
    const purpose = document.getElementById("purpose").value;

    // Simple validation
    if (!mobile || !purpose) {
        alert("Please fill all required fields.");
        return;
    }

    // Prepare email params
    const emailParams = {
        mobile_number: mobile,
        purpose: purpose
    };

    // Send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams) // Replace with your service & template ID
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("🎉 Your application has been submitted successfully!");
            document.getElementById("fundForm").reset(); // Optional: Reset form after submission
        }, function(error) {
            console.error("FAILED...", error);
            alert("❌ Something went wrong. Please try again.");
        });
});
