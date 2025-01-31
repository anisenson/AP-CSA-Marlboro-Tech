let slideIndex = 0;
let reviews = [];

async function fetchReviews() {
    try {
        const response = await fetch('reviews.json');
        reviews = await response.json();
        renderReviews();
        showSlide(slideIndex);
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

function renderReviews() {
    const slideshow = document.getElementById("slideshow");
    const dotsContainer = document.getElementById("dots");
    slideshow.innerHTML = '';
    dotsContainer.innerHTML = '';

    reviews.forEach((review, index) => {
        // Create slide
        slideshow.innerHTML += `
            <div class="mySlides">
                <q>${review.Review}</q>
                <p class="author">- ${review.Name}</p>
            </div>`;

        // Create dot
        dotsContainer.innerHTML += `<span class="dot" onclick="setSlide(${index})"></span>`;
    });

    // Add navigation buttons
    slideshow.innerHTML += `
        <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
        <a class="next" onclick="changeSlide(1)">&#10095;</a>`;
}

function showSlide(index) {
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");

    slideIndex = (index + slides.length) % slides.length; // Loop around if needed

    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
}

function changeSlide(step) {
    showSlide(slideIndex + step);
}

function setSlide(index) {
    showSlide(index);
}

// Load reviews on page load
fetchReviews();


// modal

function openModal(button) {
    const card = button.closest('.card');
    document.getElementById("modalImage").src = card.querySelector('.card-img').src;
    document.getElementById("modalTitle").textContent = card.querySelector('.card-title').textContent;
    document.getElementById("modalSubtitle").textContent = card.querySelector('.card-sub-title').textContent;
    document.getElementById("modalDescription").textContent = card.querySelector('.card-info').textContent;
    
    document.getElementById("infoModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("infoModal").style.display = "none";
}
