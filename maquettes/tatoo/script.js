// --- Video Playback Control ---
function forceVideoPlayback() {
    const video = document.getElementById('heroVideo');
    if (video) {
        video.play().catch(error => {
            console.warn("Video autoplay prevented:", error);
        });
    }
}

// --- Functions for Google Map & Cookie Banner ---
function loadGoogleMap() {
    const googleMapIframe = document.getElementById('googleMapIframe');
    const mapPlaceholder = document.getElementById('mapPlaceholder');

    if (googleMapIframe && mapPlaceholder) {
        googleMapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.136413932258!2d-0.57393868446363!3d44.84123497909833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527c8596b250b%3A0x409b349a7354740!2sBordeaux%2C%20France!5e0!3m2!1sen!2sus!4v1678886400000!5m2!1sen!2sus";
        mapPlaceholder.classList.add('hidden');
    }
}

function showCookieBannerForMap() {
    const cookieBanner = document.getElementById('cookieConsentBanner');
    cookieBanner.classList.remove('hidden');
    cookieBanner.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// --- Core Cookie Consent Logic ---
document.addEventListener('DOMContentLoaded', function() {
    forceVideoPlayback();

    const cookieBanner = document.getElementById('cookieConsentBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');

    const COOKIE_NAME = 'encre_noire_cookie_consent';

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function hideCookieBanner() {
        cookieBanner.classList.add('hidden');
    }

    const consent = getCookie(COOKIE_NAME);

    if (consent === 'accepted') {
        hideCookieBanner();
        loadGoogleMap();
    } else if (consent === 'declined') {
        hideCookieBanner();
    } else {
        showCookieBannerForMap();
    }

    acceptBtn.addEventListener('click', function() {
        setCookie(COOKIE_NAME, 'accepted', 365);
        hideCookieBanner();
        loadGoogleMap();
    });

    declineBtn.addEventListener('click', function() {
        setCookie(COOKIE_NAME, 'declined', 365);
        hideCookieBanner();
    });
});

// --- Mobile Menu Functions ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// --- Quote Modal Functions ---
function openQuoteModal() {
    document.getElementById('quoteModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    document.getElementById('quoteModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

document.getElementById('quoteModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeQuoteModal();
    }
});

// --- Project Option Selection in Quote Modal ---
document.querySelectorAll('.project-option').forEach(option => {
    option.addEventListener('click', function() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        const optionDiv = this.querySelector('div');

        if (checkbox.checked) {
            optionDiv.classList.add('border-gray-900', 'bg-gray-100');
            optionDiv.classList.remove('border-gray-300');
        } else {
            optionDiv.classList.remove('border-gray-900', 'bg-gray-100');
            optionDiv.classList.add('border-gray-300');
        }
    });
});

// --- Step Navigation in Quote Modal ---
function nextStep() {
    const selectedOptions = document.querySelectorAll('input[name="project_type"]:checked');
    if (selectedOptions.length === 0) {
        console.log('Veuillez sélectionner un type de projet.');
        return;
    }

    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');

    document.querySelectorAll('.step-indicator')[0].classList.remove('active', 'bg-gray-900', 'text-white');
    document.querySelectorAll('.step-indicator')[0].classList.add('border-2', 'border-gray-300', 'text-gray-400');

    document.querySelectorAll('.step-indicator')[1].classList.add('active', 'bg-gray-900', 'text-white');
    document.querySelectorAll('.step-indicator')[1].classList.remove('border-2', 'border-gray-300', 'text-gray-400');

    document.querySelectorAll('.step-indicator')[0].nextElementSibling.classList.add('text-gray-400');
    document.querySelectorAll('.step-indicator')[1].nextElementSibling.classList.remove('text-gray-400');
}

function previousStep() {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');

    document.querySelectorAll('.step-indicator')[1].classList.remove('active', 'bg-gray-900', 'text-white');
    document.querySelectorAll('.step-indicator')[1].classList.add('border-2', 'border-gray-300', 'text-gray-400');

    document.querySelectorAll('.step-indicator')[0].classList.add('active', 'bg-gray-900', 'text-white');
    document.querySelectorAll('.step-indicator')[0].classList.remove('border-2', 'border-gray-300', 'text-gray-400');

    document.querySelectorAll('.step-indicator')[1].nextElementSibling.classList.add('text-gray-400');
    document.querySelectorAll('.step-indicator')[0].nextElementSibling.classList.remove('text-gray-400');
}

// --- Carousel Functions ---
function scrollCarousel(direction) {
    const carousel = document.getElementById('carousel');
    const scrollAmount = 320;

    if (direction === -1) {
        carousel.scrollLeft -= scrollAmount;
    } else {
        carousel.scrollLeft += scrollAmount;
    }
}

// --- Smooth Scroll for Navigation Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            document.getElementById('mobileMenu').classList.add('hidden');
        }
    });
});

// --- Form Submission Handler ---
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Merci pour votre demande ! Nous vous contacterons dans les plus brefs délais.');
        closeQuoteModal();
    });
});

// --- Close Modal on Escape Key Press ---
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !document.getElementById('quoteModal').classList.contains('hidden')) {
        closeQuoteModal();
    }
});


// --- Header Scroll Effect ---
window.addEventListener('scroll', function() {
    const header = document.querySelector('nav');
    const heroSection = document.getElementById('hero');
    const menuItems = document.querySelectorAll('.menu-item-text');
    const headerTitle = document.querySelector('.header-title-text');

    const heroBottom = heroSection.offsetHeight;

    if (window.scrollY > heroBottom - header.offsetHeight) {
        header.classList.add('scrolled-header');

        menuItems.forEach(item => {
            item.classList.remove('text-white');
            item.classList.add('text-gray-700');
        });
        if (headerTitle) {
            headerTitle.classList.remove('text-white');
            headerTitle.classList.add('text-gray-900');
        }

    } else {
        header.classList.remove('scrolled-header');

        menuItems.forEach(item => {
            item.classList.remove('text-gray-700');
            item.classList.add('text-white');
        });
        if (headerTitle) {
            headerTitle.classList.remove('text-gray-900');
            headerTitle.classList.add('text-white');
        }
    }
});
