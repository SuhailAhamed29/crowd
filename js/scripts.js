// scripts.js



const cardsData = {
    song1: {
        imgSrc: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        title: "Project 1",
        description: [
            "Description of song 1",
            "Second point of the description",
            "Third point of the description"
        ]
    },
    song2: {
        imgSrc: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
        title: "Mitran Di Chhatri",
        description: [
            "Babbu Maan, a legendary Punjabi singer",
            "He is known for his soulful music.",
            "He has a huge fan base in Punjab and around the world."
        ]
    }
};


function showPopup(cardId) {
    const card = cardsData[cardId];
    if (card) {
        document.getElementById('popup-image').src = card.imgSrc;
        document.getElementById('popup-title').textContent = card.title;
        document.getElementById('popup-description').textContent = card.description;

        const donateButton = document.createElement('button');
        donateButton.textContent = "Donate";
        donateButton.classList.add('donate-button');

        const popupDescription = document.getElementById('popup-description');
        popupDescription.appendChild(donateButton);

        donateButton.addEventListener('click', (event) => {
            event.stopPropagation();
            localStorage.setItem('selectedCard', JSON.stringify({
                title: card.title,
                description: card.description
            }));
            window.location.href = "payment.html";
        });

        const popupOverlay = document.getElementById('popup');
        popupOverlay.style.display = 'flex';
        popupOverlay.classList.remove('fade-out');
        popupOverlay.classList.add('fade-in');

        popupOverlay.addEventListener('click', closePopup);
    }
}

function closePopup() {
    const popupOverlay = document.getElementById('popup');
    popupOverlay.classList.remove('fade-in');
    popupOverlay.classList.add('fade-out');

    popupOverlay.addEventListener('animationend', () => {
        if (popupOverlay.classList.contains('fade-out')) {
            popupOverlay.style.display = 'none';
            popupOverlay.classList.remove('fade-out');
        }
    }, { once: true });
}