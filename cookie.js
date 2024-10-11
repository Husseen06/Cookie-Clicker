class UpgradeManager {
    constructor(totalUpgrades) {
        this.activeUpgrades = 0;
        this.totalUpgrades = totalUpgrades;
        this.activeUpgradesSpan = document.getElementById('active-upgrades');
        this.progressBar = document.getElementById('upgrade-progress');
    }

    handleUpgrade() {
        this.activeUpgrades++;
        this.updateProgress();

        if (this.activeUpgrades % 3 === 0) {
            this.unlockNewUpgrades();
            this.resetProgressBar();
        }
    }

    updateProgress() {
        this.activeUpgradesSpan.textContent = this.activeUpgrades;
        const upgradesInCurrentRound = this.activeUpgrades % 3; // Only the upgrades in the current round
        const progressPercentage = (upgradesInCurrentRound / 3) * 100;
        this.progressBar.style.width = Math.min(progressPercentage, 100) + '%';
    }

    unlockNewUpgrades() {
        const newUpgrades = document.querySelectorAll('.hidden');
        newUpgrades.forEach(button => {
            button.classList.remove('hidden');
        });
    }

    resetProgressBar() {
        // Resets only the progress bar but keeps the total active upgrades count
        this.progressBar.style.width = '0%';
    }
}

class AutoClickerManager {
    constructor(totalAutoClickers) {
        this.activeAutoClickers = 0;
        this.totalAutoClickers = totalAutoClickers;
        this.activeAutoClickersSpan = document.getElementById('active-auto-clickers');
        this.autoClickerProgressBar = document.getElementById('auto-clicker-progress');
    }

    handleAutoClicker() {
        this.activeAutoClickers++;
        this.updateProgress();
    }

    updateProgress() {
        this.activeAutoClickersSpan.textContent = this.activeAutoClickers;
        const progressPercentage = (this.activeAutoClickers / this.totalAutoClickers) * 100;
        this.autoClickerProgressBar.style.width = Math.min(progressPercentage, 100) + '%';
    }
}

class Clicker {
    constructor(start) {
        this.count = start;
        this.cookiesPerClick = 1;
        this.autoClickRate = 0;
        this.displayCount();
        this.startAutoClickers();
        this.upgradeManager = new UpgradeManager(3); // Initializes UpgradeManager
        this.autoClickerManager = new AutoClickerManager(3); // Initializes AutoClickerManager
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
            buttonElement.style.display = 'none';
            this.displayCount();

            this.upgradeManager.handleUpgrade(); // Updates progress after each upgrade
        } else {
            alert("Not enough cookies!");
        }
    }

    purchaseAutoClicker(cost, rate, buttonElement) {
        if (this.count >= cost) {
            this.count -= cost;
            this.autoClickRate += rate;
            buttonElement.style.display = 'none';
            this.displayCount();

            this.autoClickerManager.handleAutoClicker(); // Updates progress after each auto-clicker purchase
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
        }, 1000);
    }
}

// Initialize Clicker game
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
const autoClickerButton = document.querySelector('.auto-clicker-item:nth-child(1)');
const superClickerButton = document.querySelector('.auto-clicker-item:nth-child(2)');
const megaClickerButton = document.querySelector('.auto-clicker-item:nth-child(3)');

// Event listeners for auto-clickers
autoClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(750, 5, autoClickerButton);
});

superClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(5000, 200, superClickerButton);
});

megaClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(10000, 1000, megaClickerButton);
});
