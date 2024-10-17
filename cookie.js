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

    purchaseUpgrade(cost, multiplier, buttonElement) {
        if (this.count >= cost) {
            this.count -= cost;
            this.cookiesPerClick *= multiplier;
            buttonElement.style.display = 'none';  // Hide the upgrade button after purchase
            this.displayCount();
            upgradeManager.handleUpgrade();  // Update progress for upgrades
        } else {
            alert("Not enough cookies!");
        }
    }

    purchaseAutoClicker(cost, rate, buttonElement) {
        if (this.count >= cost) {
            this.count -= cost;
            this.autoClickRate += rate;
            buttonElement.style.display = 'none';  // Hide the auto-clicker button after purchase
            this.displayCount();
            autoClickerManager.handleAutoClicker();  // Update progress for auto-clickers
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
        this.activeUpgrades = 0;
        this.activeUpgradesSpan = document.getElementById('active-upgrades');
        this.progressBar = document.getElementById('upgrade-progress');
    }

    handleUpgrade() {
        this.activeUpgrades++;
        this.updateProgress();

        // Unlock new upgrades and reset progress bar after every 3 upgrades
        if (this.activeUpgrades % 3 === 0) {
            this.unlockAllNewUpgrades();
            this.resetProgressBar();
        }
    }

    updateProgress() {
        this.activeUpgradesSpan.textContent = this.activeUpgrades;
        const upgradesInCurrentRound = this.activeUpgrades % 3;
        const progressPercentage = (upgradesInCurrentRound / 3) * 100;
        this.progressBar.style.width = Math.min(progressPercentage, 100) + '%';
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
// AutoClickerManager to handle auto-clicker progress bar
class AutoClickerManager {
    constructor() {
        this.activeAutoClickers = 0;
        this.activeAutoClickersSpan = document.getElementById('active-auto-clickers');
        this.progressBar = document.getElementById('auto-clicker-progress');
    }

    handleAutoClicker() {
        this.activeAutoClickers++;
        this.updateProgress();

        // Unlock new auto-clickers starting from the fourth one
        this.unlockNextAutoClicker();
    }

    updateProgress() {
        this.activeAutoClickersSpan.textContent = this.activeAutoClickers;
        const progressPercentage = (this.activeAutoClickers % 3 / 3) * 100;
        this.progressBar.style.width = Math.min(progressPercentage, 100) + '%';
    }

    unlockNextAutoClicker() {
        // Select hidden auto-clickers starting from the fourth
        const hiddenAutoClickers = document.querySelectorAll('.auto-clicker-item.hidden');
        if (hiddenAutoClickers.length > 0) {
            hiddenAutoClickers[0].classList.remove('hidden');  // Reveal the next hidden auto-clicker
        }
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
    clicker1.purchaseUpgrade(50, 2, doubleClickerButton);
});

tripleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(250, 3, tripleClickerButton);
});

quadrupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(750, 4, quadrupleClickerButton);
});

quintupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(1500, 5, quintupleClickerButton);
});

sextupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(5000, 6, sextupleClickerButton);
});

septupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(12000, 7, septupleClickerButton);
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
    clicker1.purchaseAutoClicker(750, 1, autoClickerButton);
});

superClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(5000, 5, superClickerButton);
});

megaClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(10000, 10, megaClickerButton);
});

rareClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(500000, 50, rareClickerButton);
});

legendaryClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(2500000, 100, legendaryClickerButton);
});

mythicalClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(6000000, 200, mythicalClickerButton);
});

ultraClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(10000000, 400, ultraClickerButton); // New auto-clicker
});

supremeClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(25000000, 800, supremeClickerButton); // New auto-clicker
});

godlyClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(50000000, 1600, godlyClickerButton); // New auto-clicker
});

ultimateClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(100000000, 3200, ultimateClickerButton); // New auto-clicker
});
