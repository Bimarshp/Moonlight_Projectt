// Mobile menu functionality
document.getElementById("mobile-menu").addEventListener("click", function() {
    this.classList.toggle("active");
    document.getElementById("navbar").classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll("#navbar a").forEach((link) => {
    link.addEventListener("click", () => {
        document.getElementById("mobile-menu").classList.remove("active");
        document.getElementById("navbar").classList.remove("active");
    });
});

// Image slider
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide) => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 8000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Pause on hover
    const slider = document.querySelector(".image-slider-container");
    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);

    // Initial display
    showSlide(currentIndex);
    startSlider();
});

// Package tabs
document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".package-tab");

    tabs.forEach((tab) => {
        tab.addEventListener("click", function() {
            // Remove active class from all tabs
            tabs.forEach((t) => t.classList.remove("active"));

            // Add active class to clicked tab
            this.classList.add("active");

            // Get the tab category to show
            const tabCategory = this.getAttribute("data-tab");

            // Hide all package categories
            document.querySelectorAll(".package-category").forEach((cat) => {
                cat.classList.remove("active");
            });

            // Show the selected category
            document.getElementById(`${tabCategory}-packages`).classList.add("active");
        });
    });
});

// Scroll progress indicator
window.addEventListener("scroll", function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-progress").style.width = scrolled + "%";
});

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check for saved user preference
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

// Toggle dark mode
darkModeToggle.addEventListener("change", function() {
    if (this.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }
});

// Detect system preference
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && !localStorage.getItem("darkMode")) {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

// Watch for system preference changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
    if (!localStorage.getItem("darkMode")) {
        if (event.matches) {
            body.classList.add("dark-mode");
            darkModeToggle.checked = true;
        } else {
            body.classList.remove("dark-mode");
            darkModeToggle.checked = false;
        }
    }
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});