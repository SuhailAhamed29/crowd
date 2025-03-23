document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    localStorage.setItem('userEmail', email); // Store the email
    localStorage.setItem('isLoggedIn', 'true'); 
    window.location.href = "index.html"; 
});

document.getElementById('signupBtn')?.addEventListener('click', () => {
    alert("Signup feature coming soon!");
});