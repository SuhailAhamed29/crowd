document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("LhQId5l0mEXP0lQH7"); // Replace with your actual EmailJS User ID

    document.querySelector(".btn-donate").addEventListener("click", function () {
        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("userEmail").value.trim();
        const phone = document.getElementById("userPhone").value.trim();
        const amount = document.getElementById("customAmount").value.trim();

        // Validate input fields
        if (!name || !email || !phone || !amount) {
            alert("Please fill all fields before proceeding.");
            return;
        }

        // Get selected project from localStorage
        let projectTitle = "General Donation";
        let projectDescription = "Thank you for your kind donation.";

        const selectedProjectData = localStorage.getItem("selectedProject");
        if (selectedProjectData) {
            try {
                const parsedData = JSON.parse(selectedProjectData);
                projectTitle = parsedData.title || projectTitle;
                projectDescription = parsedData.description || projectDescription;
            } catch (error) {
                console.error("Error parsing project data:", error);
            }
        }

        // Prepare email content
        var emailParams = {
            to_email: email, 
            from_name: "Khalid Ahamed",  // Change sender name here
            from_email: "suhailahamedd27@gmail.com", // Stays the same (EmailJS limitation)
            name: name,
            amount: `₹${amount}`,
            project_title: `<strong>${projectTitle}</strong>`,
            project_description: projectDescription,
            reply_to: email
        };
        

        console.log("Sending email with:", emailParams); // Debugging

        // Send email using EmailJS
        emailjs.send("service_494i95v", "template_o8u2bhe", emailParams)
            .then(function (response) {
                alert("Thank you! A confirmation email has been sent.");
            })
            .catch(function (error) {
                console.error("Error sending email:", error);
                alert("Error sending email. Please try again.");
            });
    });
});
