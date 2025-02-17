document.addEventListener('DOMContentLoaded', function() {
    // Main hero section slider
    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");
    const imgItems = document.querySelectorAll(".image-item");
    
    let startSlider = 0;
    const endSlider = (imgItems.length - 1) * 100;
    
    function updateHeroSlider(direction) {
        if (direction === 'left' && startSlider < 0) {
            startSlider += 100;
        } else if (direction === 'right' && startSlider > -endSlider) {
            startSlider -= 100;
        }
        
        imgItems.forEach(element => {
            element.style.transform = `translateX(${startSlider}%)`;
        });
    }
    
/*slidebar**************/
const sidebarNavigationE1= document.getElementById("slidebar-container-navigation")
const sidebarOpenNavigationE1= document.getElementById("open-nav-sidebar")
const sidebarCloseNavigationE1=document.getElementById("sidebar-navigation-close")
console.log(sidebarNavigationE1)

sidebarOpenNavigationE1.addEventListener("click",()=>{
    sidebarNavigationE1.classList.toggle("slidebar-show")
})
sidebarCloseNavigationE1.addEventListener("click",()=>{
    sidebarNavigationE1.classList.toggle("slidebar-show")
})








    btnLeft.addEventListener("click", () => updateHeroSlider('left'));
    btnRight.addEventListener("click", () => updateHeroSlider('right'));
    
    // Auto-slide for hero section
    setInterval(() => {
        if (startSlider > -endSlider) {
            updateHeroSlider('right');
        } else {
            startSlider = 0;
            imgItems.forEach(element => {
                element.style.transform = `translateX(${startSlider}%)`;
            });
        }
    }, 5000);

    // Photo carousel section
    class Carousel {
        constructor(element) {
            this.track = element.querySelector('.carousel-track');
            this.items = element.querySelectorAll('.carousel-item');
            this.prevButton = element.querySelector('.prev-btn');
            this.nextButton = element.querySelector('.next-btn');
            
            this.itemWidth = 220; // Width + gap
            this.currentIndex = 0;
            this.itemsPerScreen = Math.floor(this.track.offsetWidth / this.itemWidth);
            this.maxIndex = Math.max(0, this.items.length - this.itemsPerScreen);
            
            this.initializeCarousel();
        }
        
        initializeCarousel() {
            this.updateButtons();
            
            this.prevButton.addEventListener('click', () => this.move('prev'));
            this.nextButton.addEventListener('click', () => this.move('next'));
            
            // Add touch support
            let touchStartX = 0;
            let touchEndX = 0;
            
            this.track.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });
            
            this.track.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                if (touchStartX - touchEndX > 50) {
                    this.move('next');
                } else if (touchEndX - touchStartX > 50) {
                    this.move('prev');
                }
            });
        }
        
        updateButtons() {
            this.prevButton.style.display = this.currentIndex <= 0 ? 'none' : 'flex';
            this.nextButton.style.display = this.currentIndex >= this.maxIndex ? 'none' : 'flex';
        }
        
        move(direction) {
            if (direction === 'prev' && this.currentIndex > 0) {
                this.currentIndex--;
            } else if (direction === 'next' && this.currentIndex < this.maxIndex) {
                this.currentIndex++;
            }
            
            const offset = -this.currentIndex * this.itemWidth;
            this.track.style.transform = `translateX(${offset}px)`;
            this.updateButtons();
        }
        
        resize() {
            const newItemsPerScreen = Math.floor(this.track.offsetWidth / this.itemWidth);
            if (newItemsPerScreen !== this.itemsPerScreen) {
                this.itemsPerScreen = newItemsPerScreen;
                this.maxIndex = Math.max(0, this.items.length - this.itemsPerScreen);
                this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                const offset = -this.currentIndex * this.itemWidth;
                this.track.style.transform = `translateX(${offset}px)`;
                this.updateButtons();
            }
        }
    }
    
    // Initialize all carousels
    const carousels = [];
    document.querySelectorAll('.photo-carousel-section').forEach(element => {
        carousels.push(new Carousel(element));
    });
    
    // Handle window resize for all carousels
    window.addEventListener('resize', () => {
        carousels.forEach(carousel => carousel.resize());
    });
});


