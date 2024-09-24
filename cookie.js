class clicker {
    
    constructor(start){
        this.count=start;
        this.displayCount();
    }

    click(){
        this.count++;
        this.displayCount();
    }
    displayCount() {
        const cookieCountElement = document.getElementById('cookie-count');
        cookieCountElement.textContent = this.count;
    }
}

let clicker1 = new clicker(0);

// Attach click event to the cookie image
const cookie = document.getElementById('cookie');
cookie.addEventListener('click', () => {
    clicker1.click(); // Call the click method each time the cookie is clicked
});



