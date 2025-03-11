// scripts.js

const cardsData = {
    song1: {
        imgSrc: "assets/children.jpg",
        title: "Project 1",
        description: [
            "Every child deserves access to education, regardless of background.",
            "Save the Children has educated 4,06,200 children through state and national initiatives.",
            "Focus on preparing children and adolescents for life, work, and active citizenship.",
            "Despite challenges, we continue to create solutions to reach underprivileged children.",
            "Join our mission to Educate Every Last Child!"
        ]
    },
    song2: {
        imgSrc: "assets/elephant.jpg",
        title: "Mitran Di Chhatri",
        description: [
            "Asian elephants are endangered, with only 25,000–27,000 left in India.",
            "Poaching is rising, with over 40 elephants killed in 10 months.",
            "WTI fights ivory trade using tech and intelligence — your support can help!."
        ]
    },

    song3: {  // ✅ NEW PROJECT 3 ADDED
        imgSrc: "assets/ppl.jpg", // Change to actual image link if needed
        title: "Support for Abandoned Elderly",
        description: [
            "Abandoned elderly, frail and sick, are left on streets without food, shelter, or care, facing unimaginable suffering.",
            "We rescue and care for over 230 homeless elderly, providing food, shelter, medical aid, and dignity.",
            "To continue this mission, we seek financial support — help us give them a life of hope and care!"
        ]
    }
};


// Function to show popup
function showPopup(cardId) {
    const card = cardsData[cardId];
    if (card) {
        // Set image and title
        document.getElementById('popup-image').src = card.imgSrc;
        document.getElementById('popup-title').textContent = card.title;

        // Clear previous description and create bullet points
        const popupDescription = document.getElementById('popup-description');
        popupDescription.innerHTML = ''; // Clear previous content

        const ul = document.createElement('ul'); // Create bullet list
        card.description.forEach(item => {
            const li = document.createElement('li'); // Create list item
            li.textContent = item;
            ul.appendChild(li); // Add item to list
        });
        popupDescription.appendChild(ul); // Add list to popup description

        // Add Donate button
        const donateButton = document.createElement('button');
        donateButton.textContent = "Donate";
        donateButton.classList.add('donate-button');
        popupDescription.appendChild(donateButton); // Add button to popup description

        // Handle Donate button click
        donateButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent popup close
            localStorage.setItem('selectedCard', JSON.stringify({
                title: card.title,
                description: card.description
            }));
            window.location.href = "payment.html"; // Redirect to payment
        });

        // Show popup with animation
        const popupOverlay = document.getElementById('popup');
        popupOverlay.style.display = 'flex';
        popupOverlay.classList.remove('fade-out');
        popupOverlay.classList.add('fade-in');

        // Close popup when clicking outside
        popupOverlay.addEventListener('click', closePopup);
    }
}

// Function to close popup
function closePopup() {
    const popupOverlay = document.getElementById('popup');
    popupOverlay.classList.remove('fade-in');
    popupOverlay.classList.add('fade-out');

    // Hide popup after animation
    popupOverlay.addEventListener('animationend', () => {
        if (popupOverlay.classList.contains('fade-out')) {
            popupOverlay.style.display = 'none';
            popupOverlay.classList.remove('fade-out');
        }
    }, { once: true });
}
