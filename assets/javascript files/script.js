//review slideshow
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
//End review slideshow

// modal
document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            generateCards(data);
            generateModals(data);
        })
        .catch(error => console.error("Error loading data:", error));
});

function generateCards(units) {
    const container = document.getElementById("cardContainer");
    container.innerHTML = ""; // Clear existing content

    units.forEach((unit, index) => {
        const cardHTML = `
            <div class="col-md-6 col-lg-6 col-sm-12">
                <div class="card h-100 shadow-sm">
                    <img src="${unit.mainImage}" class="card-img-top" alt="${unit.unit}" />
                    <div class="card-body text-center">
                        <h2 class="card-title">${unit.unit}</h2>
                        <p class="card-text">${unit.title}</p>
                        <button class="btn card-btn" data-bs-toggle="modal" data-bs-target="#modal${index}">
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function generateModals(units) {
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.innerHTML = ""; // Clear existing content

    units.forEach((unit, index) => {
        const thumbnails = unit.thumbnails.map(img => `
            <img src="${img}" class="thumbnail img-thumbnail mx-1" style="width: 80px; cursor: pointer;"
                onmouseover="changeMainImage('${img}', 'modal${index}-main-img')">
        `).join("");
        

        const modalHTML = `
            <div class="modal fade font-alt" id="modal${index}" tabindex="-1" aria-labelledby="modal${index}Label" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title font-main" id="modal${index}Label">${unit.unit}: ${unit.title}</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-3">
                                <img src="${unit.thumbnails[0]}" id="modal${index}-main-img" class="img-fluid rounded shadow" style="max-height: 400px; object-fit: contain;">
                            </div>
                            <div class="d-flex justify-content-center flex-wrap">
                                ${thumbnails}
                            </div>
                            <hr>
                            <div>
                                <h5><b>Synopsis:</b></h5>
                                <p>${unit.synopsis}</p>
                            </div>
                            <div>
                                <h5><b>Exam Weight:</b></h5>
                                <p>This unit accounts for <strong>${unit.examWeight}</strong> of the final exam.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        modalContainer.innerHTML += modalHTML;
    });
}

function changeMainImage(imgSrc, imgId) {
    document.getElementById(imgId).src = imgSrc;
}

//End modal



//Navbar
$(document).ready(function () {
    // Initially hide the navbar
    $('.header').hide();

    // Store the height of the landing section
    var landingHeight = $('.landing').outerHeight();

    // On scroll
    $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();

        if (currentScroll > landingHeight) {
            // If user scrolls past the landing, show the navbar
            $('.header').slideDown();
        } else {
            // If user scrolls back into the landing, hide the navbar
            $('.header').slideUp();
        }
    });
});
//end navbar