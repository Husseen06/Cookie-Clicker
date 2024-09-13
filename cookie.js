// Initialize cookie count
let cookieCount = 0;
let upgradeMultiplier = 1;
let upgradeCount = 0;


// Select DOM elements
const cookie = document.getElementById('cookie');
const cookieCountDisplay = document.getElementById('cookie-count');
const upgradeButton = document.getElementById('upgrade-button');
const upgradeCountDisplay = document.getElementById('upgrade-count');



// Add event listener to the cookie
cookie.addEventListener('click', () => {
    cookieCount += upgradeMultiplier;
    cookieCountDisplay.textContent = cookieCount;
    
    
});

// Upgrade button event listener
upgradeButton.addEventListener('click', () => {
    if (cookieCount >= 20) {
        cookieCount -= 20;
        upgradeMultiplier *= 2;
        upgradeCount++; 
    }
    
    else {
        alert("You need at least 20 cookies to buy an upgrade!");
    }

});

    
