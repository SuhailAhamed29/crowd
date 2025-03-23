// scripts.js

// Data for each social awareness project (College Student CSR Initiatives)
const cardsData = {
    song1: {
        imgSrc: "assets/children.jpg",
        title: "Education for Every Child",
        description: [
            "Millions of children in India still lack access to quality education.",
            "As part of our student initiative, we aim to raise awareness about children's right to education and support ongoing efforts.",
            "Organizations like Save the Children have educated over 4,06,200 children — we are collaborating to amplify their mission.",
            "Our project focuses on encouraging youth involvement and community engagement to support underprivileged children's education.",
            "Join us to make a difference — because every child deserves a chance to learn and grow!"
        ]
    },
    song2: {
        imgSrc: "assets/elephant.jpg",
        title: "Protect Asian Elephants",
        description: [
            "Asian elephants are now endangered, with their population in India falling to just 25,000–27,000.",
            "Our student-led conservation project highlights the growing issue of poaching — over 40 elephants killed in just 10 months.",
            "Through awareness campaigns, we support Wildlife Trust of India's (WTI) efforts using technology and intelligence to stop ivory trade.",
            "Together, we can protect these majestic creatures — support our cause!"
        ]
    },

    song3: {
        imgSrc: "assets/ppl.jpg",
        title: "Care for Abandoned Elderly",
        description: [
            "Every day, elderly people are abandoned and left on streets without food, shelter, or care — a reality that needs urgent attention.",
            "As part of our college social responsibility project, we collaborate with NGOs to provide support and dignity to over 230 homeless elderly individuals.",
            "Our aim is to spread awareness and encourage financial contributions to ensure they receive food, shelter, medical aid, and compassion.",
            "Let's work together to bring hope and care to those forgotten by society."
        ]
    }
};


// Function to show popup when card is clicked
function showPopup(cardId) {
    let card;
    
    // Check if it's a user-created fundraiser
    if (cardId.startsWith('user')) {
        const userFundraisers = JSON.parse(localStorage.getItem("userFundraisers")) || [];
        const index = parseInt(cardId.replace('user', ''));
        card = userFundraisers[index];
    } else {
        card = cardsData[cardId];
    }
    
    if (card) {
        // Set image and title in popup
        document.getElementById('popup-image').src = card.imgSrc;
        document.getElementById('popup-title').textContent = card.title;

        // Clear previous content and create bullet points for description
        const popupDescription = document.getElementById('popup-description');
        popupDescription.innerHTML = ''; // Clear previous description

        const ul = document.createElement('ul'); // Bullet list for description
        card.description.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        popupDescription.appendChild(ul); // Append list to popup

        // Add contact info for user-created fundraisers
        if (card.isUserCreated) {
            const contactInfo = document.createElement('div');
            contactInfo.innerHTML = `
                <h4 style="margin-top: 15px; text-align: left;">Contact Information:</h4>
                <p style="text-align: left; margin-bottom: 5px;">Email: ${card.contactEmail}</p>
                <p style="text-align: left;">Phone: ${card.contactPhone}</p>
            `;
            popupDescription.appendChild(contactInfo);
        }

        // Add "Donate" button for participation
        const donateButton = document.createElement('button');
        donateButton.textContent = "Donate / Support Us";
        donateButton.classList.add('donate-button');
        popupDescription.appendChild(donateButton); // Append button to popup

        // Handle "Donate" button click to move to payment/participation page
        donateButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent popup from closing
            localStorage.setItem('selectedProject', JSON.stringify({
                title: card.title,
                description: card.description.join("\n") // Store full description
            }));
            window.location.href = "payment.html"; // Redirect to payment page
        });

        // Show popup with fade-in animation
        const popupOverlay = document.getElementById('popup');
        popupOverlay.style.display = 'flex';
        popupOverlay.classList.remove('fade-out');
        popupOverlay.classList.add('fade-in');

        // Close popup when clicking outside content
        popupOverlay.addEventListener('click', closePopup);
    }
}

// Function to close popup smoothly
function closePopup() {
    const popupOverlay = document.getElementById('popup');
    popupOverlay.classList.remove('fade-in');
    popupOverlay.classList.add('fade-out');

    // Hide popup after animation ends
    popupOverlay.addEventListener('animationend', () => {
        if (popupOverlay.classList.contains('fade-out')) {
            popupOverlay.style.display = 'none';
            popupOverlay.classList.remove('fade-out');
        }
    }, { once: true });
}

// Function to load all projects including user-created ones
document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.querySelector('.card-container');
    if (!cardContainer) return; // Only run on pages with the card container
    
    // Add user-created fundraisers if they exist
    const userFundraisers = JSON.parse(localStorage.getItem("userFundraisers")) || [];
    
    if (userFundraisers.length > 0) {
        userFundraisers.forEach((fundraiser, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('onclick', `showPopup('user${index}')`);
            
            card.innerHTML = `
                <img src="${fundraiser.imgSrc}" alt="${fundraiser.title}">
                <h3>${fundraiser.title}</h3>
                <p>${fundraiser.description[0].substring(0, 50)}...</p>
            `;
            
            cardContainer.appendChild(card);
        });
    }
});