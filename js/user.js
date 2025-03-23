document.addEventListener("DOMContentLoaded", function() {
    // Show/hide "Other" purpose field based on dropdown selection
    const purposeSelect = document.getElementById("purpose");
    const otherPurposeGroup = document.getElementById("otherPurposeGroup");
    const otherPurposeInput = document.getElementById("otherPurpose");

    purposeSelect.addEventListener("change", function() {
        if (this.value === "Other") {
            otherPurposeGroup.style.display = "block";
            otherPurposeInput.setAttribute("required", "required");
        } else {
            otherPurposeGroup.style.display = "none";
            otherPurposeInput.removeAttribute("required");
        }
    });

    // Handle form submission
    const userFundForm = document.getElementById("userFundForm");
    
    userFundForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get form values
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const purpose = document.getElementById("purpose").value;
        const otherPurpose = document.getElementById("otherPurpose").value;
        const targetAmount = document.getElementById("targetAmount").value;
        const description = document.getElementById("description").value;
        const imageLink = document.getElementById("imageLink").value || "assets/default-fundraiser.jpg";
        
        // Create fundraiser object
        const fundraiser = {
            title: `${fullName}'s ${purpose === "Other" ? otherPurpose : purpose} Fundraiser`,
            imgSrc: imageLink,
            description: [
                `${fullName} is raising ₹${targetAmount} for ${purpose === "Other" ? otherPurpose : purpose}.`,
                description
            ],
            contactEmail: email,
            contactPhone: phone,
            isUserCreated: true
        };
        
        // Get existing user fundraisers from localStorage or create new array
        let userFundraisers = JSON.parse(localStorage.getItem("userFundraisers")) || [];
        
        // Add new fundraiser to the array
        userFundraisers.push(fundraiser);
        
        // Save back to localStorage
        localStorage.setItem("userFundraisers", JSON.stringify(userFundraisers));
        
        // Alert user and redirect to home page
        alert("Your fundraiser has been created successfully!");
        window.location.href = "index.html";
    });
});