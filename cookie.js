class Clicker {
    constructor(start) {
        this.count = start;
        this.cookiesPerClick = 10000;  // Set default click to 10,000 for testing
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
            floatingText.textContent = '+${this.cookiesPerClick}';
            floatingText.classList.remove('show');
            void floatingText.offsetWidth;  // Trigger reflow for animation reset
            floatingText.classList.add('show');
        }
    }

    // Purchase upgrade and reveal the next one if applicable
    purchaseUpgrade(cost, multiplier, buttonElement, upgradeName, nextUpgradeId = null) {
        if (this.count >= cost) {
            this.count -= cost;
            this.cookiesPerClick *= multiplier;
            buttonElement.style.display = 'none';  // Hide purchased upgrade
            this.displayCount();
            upgradeManager.handleUpgrade(upgradeName); // Track active upgrades

            // Reveal the next upgrade if there is one
            if (nextUpgradeId) {
                const nextUpgrade = document.getElementById(nextUpgradeId);
                if (nextUpgrade) {
                    nextUpgrade.classList.remove('hidden');
                }
            }
        } else {
            alert("Not enough cookies!");
        }
    }

    // Purchase auto-clicker and reveal the next one if applicable
    purchaseAutoClicker(cost, rate, buttonElement, autoClickerName, nextAutoClickerId = null) {
        if (this.count >= cost) {
            this.count -= cost;
            this.autoClickRate += rate;
            buttonElement.style.display = 'none';  // Hide purchased auto-clicker
            this.displayCount();
            upgradeManager.handleUpgrade(autoClickerName); // Track active auto-clickers

            // Reveal the next auto-clicker if there is one
            if (nextAutoClickerId) {
                const nextAutoClicker = document.getElementById(nextAutoClickerId);
                if (nextAutoClicker) {
                    nextAutoClicker.classList.remove('hidden');
                }
            }
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
        this.activeUpgrades = [];
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

// Create instances
const clicker = new Clicker(0);
const upgradeManager = new UpgradeManager();

// Handle clicks on the cookie
document.getElementById('cookie').addEventListener('click', () => {
    clicker.click();
});

// Handle upgrades purchase
document.querySelectorAll('.upgrade-item').forEach((button, index) => {
    const upgradeDetails = [
        { cost: 50, multiplier: 2, name: 'Double Clicker', nextUpgradeId: 'quintuple-clicker' },
        { cost: 250, multiplier: 3, name: 'Triple Clicker', nextUpgradeId: 'sextuple-clicker' },
        { cost: 750, multiplier: 4, name: 'Quadruple Clicker', nextUpgradeId: 'septuple-clicker' },
        { cost: 1500, multiplier: 5, name: 'Quintuple Clicker', nextUpgradeId: 'sextuple-clicker' },
        { cost: 5000, multiplier: 6, name: 'Sextuple Clicker', nextUpgradeId: 'septuple-clicker' },
        { cost: 12000, multiplier: 7, name: 'Septuple Clicker', nextUpgradeId: null } // No more after Septuple
    ];

    const upgrade = upgradeDetails[index];
    button.addEventListener('click', () => {
        clicker.purchaseUpgrade(upgrade.cost, upgrade.multiplier, button, upgrade.name, upgrade.nextUpgradeId);
    });
});

// Handle auto-clickers purchase
document.querySelectorAll('.auto-clicker-item').forEach((button, index) => {
    const autoClickerDetails = [
        { cost: 750, rate: 1, name: 'Auto Clicker', nextAutoClickerId: 'super-clicker' },
        { cost: 5000, rate: 2, name: 'Super Clicker', nextAutoClickerId: 'mega-clicker' },
        { cost: 10000, rate: 5, name: 'Mega Clicker', nextAutoClickerId: 'rare-clicker' },
        { cost: 500000, rate: 10, name: 'Rare Clicker', nextAutoClickerId: 'legendary-clicker' },
        { cost: 2500000, rate: 25, name: 'Legendary Clicker', nextAutoClickerId: 'mythical-clicker' },
        { cost: 6000000, rate: 50, name: 'Mythical Clicker', nextAutoClickerId: 'ultra-clicker' },
        { cost: 10000000, rate: 100, name: 'Ultra Clicker', nextAutoClickerId: 'supreme-clicker' },
        { cost: 25000000, rate: 200, name: 'Supreme Clicker', nextAutoClickerId: 'godly-clicker' },
        { cost: 50000000, rate: 500, name: 'Godly Clicker', nextAutoClickerId: null } // No more after Godly
    ];

    const autoClicker = autoClickerDetails[index];
    button.addEventListener('click', () => {
        clicker.purchaseAutoClicker(autoClicker.cost, autoClicker.rate, button, autoClicker.name, autoClicker.nextAutoClickerId);
    });
});