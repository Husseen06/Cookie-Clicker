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
        this.animateGainedCookies();  // Call the new animation function
    }

    displayCount() {
        const cookieCountElement = document.getElementById('cookie-count');
        cookieCountElement.textContent = this.count;
    }

    animateGainedCookies() {
        const floatingText = document.getElementById('floating-text');
        floatingText.textContent = `+${this.cookiesPerClick}`;  // Update the gained cookie amount
        floatingText.classList.remove('show');  // Reset the animation

        // Trigger reflow to restart the animation
        void floatingText.offsetWidth;
        
        floatingText.classList.add('show');  // Start the animation again
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
        this.activeUpgradesList = document.getElementById('active-upgrades-list');
    }

    handleUpgrade() {
        this.activeUpgrades++;
        this.updateProgress();

        // Unlock the next hidden upgrade immediately after each purchase
        this.unlockNextUpgrade();
    }

    updateProgress() {
        this.activeUpgradesSpan.textContent = this.activeUpgrades;
        const upgradesInCurrentRound = this.activeUpgrades % 3;
        const progressPercentage = (upgradesInCurrentRound / 3) * 100;
        this.progressBar.style.width = Math.min(progressPercentage, 100) + '%';
        this.updateActiveUpgradesDisplay();
    }

    unlockNextUpgrade() {
        // Select hidden upgrades
        const hiddenUpgrades = document.querySelectorAll('.upgrade-item.hidden');
        if (hiddenUpgrades.length > 0) {
            hiddenUpgrades[0].classList.remove('hidden');  // Reveal the next hidden upgrade
        }
    }

    updateActiveUpgradesDisplay() {
        if (this.activeUpgrades === 0) {
            this.activeUpgradesList.textContent = 'Active Upgrades: None';
        } else {
            this.activeUpgradesList.textContent = 'Active Upgrades: ' + this.activeUpgrades;
        }
    }

    resetProgressBar() {
        this.progressBar.style.width = '0%';
    }
}

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

// Event listeners for auto-clickers
autoClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(750, 1, autoClickerButton);
});

superClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(5000, 10, superClickerButton);
});

megaClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(10000, 80, megaClickerButton);
});

rareClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(500000, 500, rareClickerButton);
});

legendaryClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(2500000, 1200, legendaryClickerButton);
});

mythicalClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(6000000, 5000, mythicalClickerButton);
});

ultraClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(10000000, 20000, ultraClickerButton); // New auto-clicker
});

supremeClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(25000000, 100000, supremeClickerButton); // New auto-clicker
});

godlyClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(50000000, 500000, godlyClickerButton); // New auto-clicker
});
