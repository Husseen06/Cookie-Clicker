class Clicker {
    constructor(start) {
        this.count = start;
        this.cookiesPerClick = 10000;
        this.autoClickRate = 0;
        this.displayCount();
        this.startAutoClickers();
    }

    click() {
        this.count += this.cookiesPerClick;
        this.displayCount();
        this.animateGainedCookies();
    }

    formatCookies(number) {
        if (number >= 1e15) return (number / 1e15).toFixed(1) + "Q";
        if (number >= 1e12) return (number / 1e12).toFixed(1) + "T";
        if (number >= 1e9) return (number / 1e9).toFixed(1) + "B";
        if (number >= 1e6) return (number / 1e6).toFixed(1) + "M";
        if (number >= 1e3) return (number / 1e3).toFixed(1) + "K";
        return number.toString();
    }

    displayCount() {
        const cookieCountElement = document.getElementById('cookie-count');
        if (cookieCountElement) {
            cookieCountElement.textContent = " " + this.formatCookies(this.count);
        }
    }

    animateGainedCookies() {
        const floatingText = document.getElementById('floating-text');
        if (floatingText) {
            floatingText.textContent = `+${this.formatCookies(this.cookiesPerClick)}`;
            floatingText.classList.remove('show');
            void floatingText.offsetWidth;
            floatingText.classList.add('show');
        }
    }

    purchaseUpgrade(cost, multiplier, buttonElement, upgradeName, nextUpgradeId = null) {
        if (this.count >= cost) {
            this.count -= cost;
            this.cookiesPerClick *= multiplier;
            buttonElement.style.display = 'none';
            this.displayCount();
            upgradeManager.handleUpgrade(upgradeName);

            if (nextUpgradeId) {
                const nextUpgrade = document.getElementById(nextUpgradeId);
                if (nextUpgrade) {
                    nextUpgrade.classList.remove('hidden');
                }
            }
        } else {
            alert("Niet genoeg cookies!");
        }
    }

    purchaseAutoClicker(cost, rate, buttonElement, autoClickerName, nextAutoClickerId = null) {
        if (this.count >= cost) {
            this.count -= cost;
            this.autoClickRate += rate;
            buttonElement.style.display = 'none';
            this.displayCount();
            upgradeManager.handleUpgrade(autoClickerName);

            if (nextAutoClickerId) {
                const nextAutoClicker = document.getElementById(nextAutoClickerId);
                if (nextAutoClicker) {
                    nextAutoClicker.classList.remove('hidden');
                }
            }
        } else {
            alert("Niet genoeg cookies!");
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

const clicker = new Clicker(0);
const upgradeManager = new UpgradeManager();

document.getElementById('cookie').addEventListener('click', () => {
    clicker.click();
});

document.querySelectorAll('.upgrade-item').forEach((button, index) => {
    const upgradeDetails = [
        { cost: 50, multiplier: 2, name: 'Double Clicker', nextUpgradeId: 'quintuple-clicker' },
        { cost: 250, multiplier: 3, name: 'Triple Clicker', nextUpgradeId: 'sextuple-clicker' },
        { cost: 750, multiplier: 4, name: 'Quadruple Clicker', nextUpgradeId: 'septuple-clicker' },
        { cost: 1500, multiplier: 5, name: 'Quintuple Clicker', nextUpgradeId: 'sextuple-clicker' },
        { cost: 5000, multiplier: 6, name: 'Sextuple Clicker', nextUpgradeId: 'septuple-clicker' },
        { cost: 12000, multiplier: 7, name: 'Septuple Clicker', nextUpgradeId: null }
    ];

    const upgrade = upgradeDetails[index];
    button.addEventListener('click', () => {
        clicker.purchaseUpgrade(upgrade.cost, upgrade.multiplier, button, upgrade.name, upgrade.nextUpgradeId);
    });
});

document.querySelectorAll('.auto-clicker-item').forEach((button, index) => {
    const autoClickerDetails = [
        { cost: 750, rate: 1, name: 'Auto Clicker', nextAutoClickerId: 'rare-clicker' },
        { cost: 5000, rate: 2, name: 'Super Clicker', nextAutoClickerId: 'legendary-clicker' },
        { cost: 10000, rate: 5, name: 'Mega Clicker', nextAutoClickerId: 'mythical-clicker' },
        { cost: 500000, rate: 10, name: 'Rare Clicker', nextAutoClickerId: 'ultra-clicker' },
        { cost: 2500000, rate: 25, name: 'Legendary Clicker', nextAutoClickerId: 'supreme-clicker' },
        { cost: 6000000, rate: 50, name: 'Mythical Clicker', nextAutoClickerId: 'godly-clicker' },
        { cost: 10000000, rate: 100, name: 'Ultra Clicker', nextAutoClickerId: null },
        { cost: 25000000, rate: 200, name: 'Supreme Clicker', nextAutoClickerId: null },
        { cost: 50000000, rate: 500, name: 'Godly Clicker', nextAutoClickerId: null }
    ];

    const autoClicker = autoClickerDetails[index];
    button.addEventListener('click', () => {
        clicker.purchaseAutoClicker(autoClicker.cost, autoClicker.rate, button, autoClicker.name, autoClicker.nextAutoClickerId);
    });
});
