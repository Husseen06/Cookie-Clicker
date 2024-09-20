class CookieGame {
    constructor() {
        this.cookieCount = 0;
        this.upgradeMultiplier = 1;
        this.upgradeCount = 0;

        // Select DOM elements
        this.cookie = document.getElementById('cookie');
        this.cookieCountDisplay = document.getElementById('cookie-count');
        this.upgradeButton = document.getElementById('upgrade-button');
        this.upgradeCountDisplay = document.getElementById('upgrade-count');

        // Bind events
        this.initEventListeners();
    }

    // Methode om event listeners te initialiseren
    initEventListeners() {
        this.cookie.addEventListener('click', () => this.incrementCookies());
        this.upgradeButton.addEventListener('click', () => this.purchaseUpgrade());
    }

    // Methode om cookies te verhogen
    incrementCookies() {
        this.cookieCount += this.upgradeMultiplier;
        this.updateDisplay();
    }

    // Methode om een upgrade te kopen
    purchaseUpgrade() {
        if (this.cookieCount >= 20) {
            this.cookieCount -= 20;
            this.upgradeMultiplier *= 2;
            this.upgradeCount++;
            this.updateDisplay();
        } else {
            alert("You need at least 20 cookies to buy an upgrade!");
        }
    }

    // Methode om de weergave van de cookie-telling en upgrade te updaten
    updateDisplay() {
        this.cookieCountDisplay.textContent = this.cookieCount;
        this.upgradeCountDisplay.textContent = this.upgradeCount;
    }
}

// Initieer het spel
const game = new CookieGame();
