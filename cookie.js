class Clicker {
    constructor(start) {
        this.count = start;
        this.cookiesPerClick = 1;
        this.autoClickRate = 0;
        this.displayCount();
        this.startAutoClickers();
    }
 
    click() {
        this.count += this.cookiesPerClick;
        this.displayCount();
    }
 
    displayCount() {
        const cookieCountElement = document.getElementById('cookie-count');
        cookieCountElement.textContent = this.count;
    }
 
    purchaseUpgrade(cost, multiplier, buttonElement, upgradeName) {
        if (this.count >= cost) {
            this.count -= cost;
            this.cookiesPerClick *= multiplier;
            buttonElement.style.display = 'none'; // Hide the upgrade button after purchase
            this.displayCount();
            upgradeManager.handleUpgrade(upgradeName); // Update progress for upgrades
        } else {
            alert("Not enough cookies!");
        }
    }
 
    purchaseAutoClicker(cost, rate, buttonElement, autoClickerName) {
        if (this.count >= cost) {
            this.count -= cost;
            this.autoClickRate += rate;
            buttonElement.style.display = 'none'; // Hide the auto-clicker button after purchase
            this.displayCount();
            autoClickerManager.handleAutoClicker(autoClickerName); // Update progress for auto-clickers
        } else {
            alert("Not enough cookies!");
        }
    }
 
    startAutoClickers() {
        setInterval(() => {
            if (this.autoClickRate > 0) {
                this.count += this.autoClickRate;
                this.displayCount();
            }
        }, 1000); // Adds cookies every second
    }
}
 
// UpgradeManager to handle upgrades progress bar
class UpgradeManager {
    constructor() {
        this.activeUpgrades = [];
        this.activeUpgradesSpan = document.getElementById('active-upgrades');
        this.progressBar = document.getElementById('upgrade-progress');
        this.activeUpgradesList = document.getElementById('active-upgrades-list');
    }
 
    handleUpgrade(upgradeName) {
        this.activeUpgrades.push(upgradeName);
        this.updateProgress();
        this.updateActiveUpgradesDisplay();
 
        // Unlock new upgrades and reset progress bar after every 3 upgrades
        if (this.activeUpgrades.length % 3 === 0) {
            this.unlockAllNewUpgrades();
            this.resetProgressBar();
        }
    }
 
    updateProgress() {
        this.activeUpgradesSpan.textContent = this.activeUpgrades.length;
        const upgradesInCurrentRound = this.activeUpgrades.length % 3;
        const progressPercentage = (upgradesInCurrentRound / 3) * 100;
        this.progressBar.style.width = Math.min(progressPercentage, 100) + '%';
    }
 
    updateActiveUpgradesDisplay() {
        if (this.activeUpgrades.length === 0) {
            this.activeUpgradesList.textContent = 'Active Upgrades: None';
        } else {
            this.activeUpgradesList.textContent = 'Active Upgrades: ' + this.activeUpgrades.join(', ');
        }
    }
 
    unlockAllNewUpgrades() {
        const hiddenUpgrades = document.querySelectorAll('.upgrade-item.hidden');
        hiddenUpgrades.forEach((upgrade, index) => {
            // Show the first 3 hidden upgrades in the list
            if (index < 3) {
                upgrade.classList.remove('hidden');
            }
        });
    }
 
    resetProgressBar() {
        this.progressBar.style.width = '0%';
    }
}
 
// AutoClickerManager to handle auto-clicker progress bar
class AutoClickerManager {
    constructor() {
        this.activeAutoClickers = [];
        this.activeAutoClickersSpan = document.getElementById('active-auto-clickers');
        this.progressBar = document.getElementById('auto-clicker-progress');
        this.activeAutoClickersList = document.getElementById('active-auto-clickers-list');
    }
 
    handleAutoClicker(autoClickerName) {
        this.activeAutoClickers.push(autoClickerName);
        this.updateProgress();
        this.updateActiveAutoClickersDisplay();
 
        // Unlock new auto-clickers and reset progress bar after every 3 auto-clickers purchased
        if (this.activeAutoClickers.length % 3 === 0) {
            this.unlockAllNewAutoClickers();
            this.resetProgressBar();
        }
    }
 
    updateProgress() {
        this.activeAutoClickersSpan.textContent = this.activeAutoClickers.length;
        const progressPercentage = (this.activeAutoClickers.length % 3 / 3) * 100;
        this.progressBar.style.width = Math.min(progressPercentage, 100) + '%';
    }
 
    updateActiveAutoClickersDisplay() {
        if (this.activeAutoClickers.length === 0) {
            this.activeAutoClickersList.textContent = 'Active Auto Clickers: None';
        } else {
            this.activeAutoClickersList.textContent = 'Active Auto Clickers: ' + this.activeAutoClickers.join(', ');
        }
    }
 
    unlockAllNewAutoClickers() {
        const hiddenAutoClickers = document.querySelectorAll('.auto-clicker-item.hidden');
        hiddenAutoClickers.forEach((autoClicker, index) => {
            // Show the first 3 hidden auto-clickers in the list
            if (index < 3) {
                autoClicker.classList.remove('hidden');
            }
        });
    }
 
    resetProgressBar() {
        this.progressBar.style.width = '0%';
    }
}
 
// Instantiate the Clicker class
let clicker1 = new Clicker(0);
 
// Instantiate the AutoClickerManager and UpgradeManager
const autoClickerManager = new AutoClickerManager();
const upgradeManager = new UpgradeManager();
 
// Cookie clicker
const cookie = document.getElementById('cookie');
cookie.addEventListener('click', () => {
    clicker1.click();
});
 
// Upgrade buttons
const doubleClickerButton = document.querySelector('.upgrade-item:nth-child(2)');
const tripleClickerButton = document.querySelector('.upgrade-item:nth-child(3)');
const quadrupleClickerButton = document.querySelector('.upgrade-item:nth-child(4)');
const quintupleClickerButton = document.getElementById('quintuple-clicker');
const sextupleClickerButton = document.getElementById('sextuple-clicker');
const septupleClickerButton = document.getElementById('septuple-clicker');
 
// Event listeners for upgrades
doubleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(50, 2, doubleClickerButton, 'Double Clicker');
});
 
tripleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(250, 3, tripleClickerButton, 'Triple Clicker');
});
 
quadrupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(750, 4, quadrupleClickerButton, 'Quadruple Clicker');
});
 
quintupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(1500, 5, quintupleClickerButton, 'Quintuple Clicker');
});
 
sextupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(5000, 6, sextupleClickerButton, 'Sextuple Clicker');
});
 
septupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(12000, 7, septupleClickerButton, 'Septuple Clicker');
});
 
// Auto-clicker buttons
const autoClickerButton = document.getElementById('auto-clicker');
const superClickerButton = document.getElementById('super-clicker');
const megaClickerButton = document.getElementById('mega-clicker');
const rareClickerButton = document.getElementById('rare-clicker');
const legendaryClickerButton = document.getElementById('legendary-clicker');
const mythicalClickerButton = document.getElementById('mythical-clicker');
const ultraClickerButton = document.getElementById('ultra-clicker'); // New auto-clicker
const supremeClickerButton = document.getElementById('supreme-clicker'); // New auto-clicker
const godlyClickerButton = document.getElementById('godly-clicker'); // New auto-clicker
const ultimateClickerButton = document.getElementById('ultimate-clicker'); // New auto-clicker
 
// Event listeners for auto-clickers
autoClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(750, 1, autoClickerButton, 'Auto Clicker');
});
 
superClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(5000, 5, superClickerButton, 'Super Clicker');
});
 
megaClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(10000, 10, megaClickerButton, 'Mega Clicker');
});
 
rareClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(500000, 50, rareClickerButton, 'Rare Clicker');
});
 
legendaryClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(2500000, 100, legendaryClickerButton, 'Legendary Clicker');
});