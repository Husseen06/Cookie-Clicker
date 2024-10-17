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

class AutoClickerManager {
    constructor() {
        this.activeAutoClickers = 0;
        this.activeAutoClickersSpan = document.getElementById('active-auto-clickers');
        this.progressBar = document.getElementById('auto-clicker-progress');
    }

    handleAutoClicker() {
        this.activeAutoClickers++;
        this.updateProgress();

        // Unlock new auto-clickers and reset progress bar after every 3 auto-clickers purchased
        if (this.activeAutoClickers % 3 === 0) {
            this.unlockAllNewAutoClickers();
            this.resetProgressBar();
        }
    }

    updateProgress() {
        this.activeAutoClickersSpan.textContent = this.activeAutoClickers;
        const progressPercentage = (this.activeAutoClickers % 3 / 3) * 100;
        this.progressBar.style.width = Math.min(progressPercentage, 100) + '%';
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

// Initialize Clicker game and other managers
let clicker1 = new Clicker(0);

// Event listeners for cookie clicking
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
