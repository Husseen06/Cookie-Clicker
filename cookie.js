class Clicker {
    constructor(start) {
        this.count = start;
        this.cookiesPerClick = 1;
        this.autoClickers = 0;
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
            buttonElement.style.display = 'none';
            this.displayCount();
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

doubleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(50, 2, doubleClickerButton);
});

tripleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(250, 3, tripleClickerButton);
});

quadrupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(750, 4, quadrupleClickerButton);
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
