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
      let selectedProjectData = localStorage.getItem("selectedProject");
      let projectTitle = "General Donation";
      let projectDescription = "Thank you for your kind donation.";

      if (selectedProjectData) {
          selectedProjectData = JSON.parse(selectedProjectData);
          projectTitle = selectedProjectData.title;
          projectDescription = selectedProjectData.description.replace(/\n/g, "<br>"); // Convert newlines to HTML
      }

      // Prepare email content
      var emailParams = {
          to_email: email, 
          from_email: "suhailahamedd27@gmail.com", 
          name: name,
          amount: `₹${amount}`,  // Format with ₹
          project_title: `<strong>${projectTitle}</strong>`, // Bold project title
          project_description: projectDescription, // Description as HTML
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
