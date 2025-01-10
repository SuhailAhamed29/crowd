 // Initialize EmailJS
 emailjs.init('LhQId5l0mEXP0lQH7'); // Replace with your EmailJS Public Key

 // Update the amount value based on slider
 const slider = document.getElementById('slider');
 const amountDisplay = document.getElementById('amount');
 slider.oninput = function() {
   amountDisplay.textContent = "Amount: ₹" + this.value;
 };

 // Function to handle the donation process
 function donate() {
   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const message = document.getElementById('message').value || "No message provided.";
   const amount = slider.value;

   if (name && email && amount > 0) {
     // Send the email using EmailJS
     const templateParams = {
       from_email: "suhailahamedd27@gmail.com",  // Your email
       to_email: email,                       // User's email entered in the form
       name: name,                             // The user's name
       message: message,                       // The user's message
       amount: amount,                         // The donation amount
     };

     emailjs.send('service_494i95v', 'template_o8u2bhe', templateParams)
       .then(function(response) {
         alert(`Thank you, ${name}! We have received your donation of ₹${amount}. A confirmation email has been sent to ${email}.`);
         console.log("SUCCESS", response.status, response.text);
       }, function(error) {
         alert("Failed to send the email. Please try again.");
         console.log("FAILED", error);
       });
   } else {
     alert("Please fill all required fields and select a valid donation amount.");
   }
 }