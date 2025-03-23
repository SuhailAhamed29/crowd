document.getElementById('loginBtn').addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', 'true'); 
    window.location.href = "index.html"; 
});

document.getElementById('signupBtn').addEventListener('click', () => {
    alert("Signup feature coming soon!");
});
