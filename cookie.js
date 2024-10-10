class UpgradeManager {
    constructor(totalUpgrades) {
        this.activeUpgrades = 0;
        this.totalUpgrades = totalUpgrades;
        this.upgradeButtons = document.querySelectorAll('.upgrade-item');
        this.activeUpgradesSpan = document.getElementById('active-upgrades');
        this.progressBar = document.querySelector('.progress');
    }

    // Increment active upgrades and update progress
    handleUpgrade() {
        this.activeUpgrades++;
        this.updateProgress();

        // Unlock new upgrades and reset progress bar if the first set of upgrades are complete
        if (this.activeUpgrades === 3) {
            this.unlockNewUpgrades();
            this.resetProgressBar(); // Reset progress bar to 0%
        }
    }

    // Update the progress bar and active upgrades display
    updateProgress() {
        this.activeUpgradesSpan.textContent = this.activeUpgrades;

        // Calculate progress percentage based on active upgrades
        const progressPercentage = (this.activeUpgrades / this.totalUpgrades) * 100;
        this.progressBar.style.width = Math.min(progressPercentage, 100) + '%'; // Ensure it doesn't exceed 100%
    }

    // Unlock the new upgrades
    unlockNewUpgrades() {
        const newUpgrades = document.querySelectorAll('.hidden');
        newUpgrades.forEach(button => {
            button.classList.remove('hidden');
        });
    }

    // Reset the progress bar but keep the active upgrades unchanged
    resetProgressBar() {
        this.totalUpgrades += 3; // Update total upgrades to include the new ones
        this.progressBar.style.width = '0%'; // Set progress bar back to 0
    }
}

class Clicker {
    constructor(start) {
        this.count = start;
        this.cookiesPerClick = 1;
        this.autoClickRate = 0;
        this.displayCount();
        this.startAutoClickers();
        this.upgradeManager = new UpgradeManager(3); // Total initial upgrades = 3
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
            
            // Only handle upgrade progress after successful purchase
            this.upgradeManager.handleUpgrade();
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

// Create a Clicker instance
let clicker1 = new Clicker(0);

// Cookie clicker
const cookie = document.getElementById('cookie');
cookie.addEventListener('click', () => {
    clicker1.click();
});

// Upgrades
const doubleClickerButton = document.querySelector('.upgrade-item:nth-child(2)');
const tripleClickerButton = document.querySelector('.upgrade-item:nth-child(3)');
const quadrupleClickerButton = document.querySelector('.upgrade-item:nth-child(4)');

// New Upgrades
const quintupleClickerButton = document.getElementById('quintuple-clicker');
const sextupleClickerButton = document.getElementById('sextuple-clicker');
const septupleClickerButton = document.getElementById('septuple-clicker');

doubleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(50, 2, doubleClickerButton);
});

tripleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(250, 3, tripleClickerButton);
});

quadrupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(750, 4, quadrupleClickerButton);
});

// Unlockable Upgrades (Initially hidden)
quintupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(1500, 5, quintupleClickerButton);
});

sextupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(5000, 6, sextupleClickerButton);
});

septupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(12000, 7, septupleClickerButton);
});

// Auto-clickers
const autoClickerButton = document.querySelector('.auto-clicker-item:nth-child(2)');
const superClickerButton = document.querySelector('.auto-clicker-item:nth-child(3)');
const megaClickerButton = document.querySelector('.auto-clicker-item:nth-child(4)');

autoClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(750, 5, autoClickerButton); // 1 cookie per second
});

superClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(5000, 200, superClickerButton); // 5 cookies per second
});

megaClickerButton.addEventListener('click', () => {
    clicker1.purchaseAutoClicker(10000, 1000, megaClickerButton); // 10 cookies per second
});


