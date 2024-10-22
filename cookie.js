class Clicker {
    constructor(start) {
        this.count = start;
        this.cookiesPerClick = 100000;
        this.autoClickRate = 0;
        this.displayCount();
        this.startAutoClickers();
    }

    click() {
        this.count += this.cookiesPerClick;
        this.displayCount();
        this.animateGainedCookies();
    }

    displayCount() {
        const cookieCountElement = document.getElementById('cookie-count');
        if (cookieCountElement) {
            cookieCountElement.textContent = this.count;
        }
    }

    animateGainedCookies() {
        const floatingText = document.getElementById('floating-text');
        if (floatingText) {
            floatingText.textContent = `+${this.cookiesPerClick}`;
            floatingText.classList.remove('show');
            void floatingText.offsetWidth;
            floatingText.classList.add('show');
        }
    }

    purchaseUpgrade(cost, multiplier, buttonElement, upgradeName) {
        if (this.count >= cost) {
            this.count -= cost;
            this.cookiesPerClick *= multiplier;
            buttonElement.style.display = 'none';
            this.displayCount();
            upgradeManager.handleUpgrade(upgradeName); // Add upgrade to the list
        } else {
            alert("Not enough cookies!");
        }
    }

    purchaseAutoClicker(cost, rate, buttonElement, autoClickerName) {
        if (this.count >= cost) {
            this.count -= cost;
            this.autoClickRate += rate;
            buttonElement.style.display = 'none';
            this.displayCount();
            upgradeManager.handleUpgrade(autoClickerName); // Add auto-clicker as an upgrade
        } else {
            alert("Not enough cookies!");
        }
    }

    startAutoClickers() {
        setInterval(() => {
            this.count += this.autoClickRate;
            this.displayCount();
        }, 1000);
    }
}

class UpgradeManager {
    constructor() {
        this.activeUpgrades = []; // Unified list for both upgrades and auto-clickers
    }

    handleUpgrade(upgradeName) {
        this.activeUpgrades.push(upgradeName);
        this.displayActiveUpgrades();
    }

    displayActiveUpgrades() {
        const activeUpgradesList = document.getElementById('active-upgrades-list');
        if (activeUpgradesList) {
            activeUpgradesList.textContent = 'Active Upgrades: ' + (this.activeUpgrades.length > 0 ? this.activeUpgrades.join(', ') : 'None');
        }
    }
}

const clicker = new Clicker(0);
const upgradeManager = new UpgradeManager();

// Handle clicks on the cookie
document.getElementById('cookie').addEventListener('click', () => {
    clicker.click();
});

// Handle upgrades purchase
document.querySelectorAll('.upgrade-item').forEach((button, index) => {
    const upgradeDetails = [
        { cost: 50, multiplier: 2, name: 'Double Clicker' },
        { cost: 250, multiplier: 3, name: 'Triple Clicker' },
        { cost: 750, multiplier: 4, name: 'Quadruple Clicker' }
    ];

    button.addEventListener('click', () => {
        const upgrade = upgradeDetails[index];
        clicker.purchaseUpgrade(upgrade.cost, upgrade.multiplier, button, upgrade.name);
    });
});

// Handle auto-clickers purchase
document.querySelectorAll('.auto-clicker-item').forEach((button, index) => {
    const autoClickerDetails = [
        { cost: 750, rate: 1, name: 'Auto Clicker' },
        { cost: 5000, rate: 2, name: 'Super Clicker' },
        { cost: 10000, rate: 5, name: 'Mega Clicker' }
    ];

    button.addEventListener('click', () => {
        const autoClicker = autoClickerDetails[index];
        clicker.purchaseAutoClicker(autoClicker.cost, autoClicker.rate, button, autoClicker.name);
    });
});
