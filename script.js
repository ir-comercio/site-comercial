// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Image carousel auto-play
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }

    function autoPlayCarousel() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-play every 4 seconds
    setInterval(autoPlayCarousel, 4000);

    // Rating stars functionality
    const stars = document.querySelectorAll('.rating-stars .star');
    const ratingInput = document.getElementById('fb-rating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingInput.value = rating;
            
            // Update star display
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        star.addEventListener('mouseenter', function() {
            const rating = this.getAttribute('data-rating');
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.style.color = '#FFD700';
                }
            });
        });

        star.addEventListener('mouseleave', function() {
            stars.forEach(s => {
                if (!s.classList.contains('active')) {
                    s.style.color = '';
                }
            });
        });
    });

    // Form type toggle
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const empresaField = document.getElementById('empresaField');
    const cnpjField = document.getElementById('cnpjField');
    const empresaInput = document.getElementById('empresa');
    const cnpjInput = document.getElementById('cnpj');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const type = this.getAttribute('data-type');
            
            if (type === 'empresa') {
                if (empresaField) empresaField.style.display = 'flex';
                if (cnpjField) cnpjField.style.display = 'flex';
                if (empresaInput) empresaInput.required = true;
                if (cnpjInput) cnpjInput.required = true;
            } else {
                if (empresaField) empresaField.style.display = 'none';
                if (cnpjField) cnpjField.style.display = 'none';
                if (empresaInput) empresaInput.required = false;
                if (cnpjInput) cnpjInput.required = false;
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            alert('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.');
            
            // Reset form
            this.reset();
            
            // Reset toggle to "Pessoa Física"
            if (toggleButtons[0]) toggleButtons[0].click();
            
            // In a real application, you would send this data to a server
            console.log('Form data:', data);
        });
    }

    // Orçamento form submission
    const orcamentoForm = document.getElementById('orcamentoForm');
    
    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            alert('Solicitação de orçamento enviada com sucesso! Entraremos em contato em breve.');
            
            // Reset form
            this.reset();
            
            // Close modal
            closeOrcamentoModal();
            
            console.log('Orçamento solicitado');
        });
    }

    // Feedback form submission
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rating = document.getElementById('fb-rating').value;
            
            if (!rating) {
                alert('Por favor, selecione uma avaliação com estrelas.');
                return;
            }
            
            // Show success message
            alert('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
            
            // Reset form
            this.reset();
            
            // Reset stars
            stars.forEach(s => s.classList.remove('active'));
            
            // Close modal
            closeFeedbackModal();
            
            console.log('Feedback enviado');
        });
    }

    // Carousel infinite scroll
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (carouselTrack) {
        // Clone slides múltiplas vezes para scroll infinito suave
        const productSlides = Array.from(carouselTrack.children);
        // Duplica 4 vezes para garantir loop perfeito
        for (let i = 0; i < 4; i++) {
            productSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                carouselTrack.appendChild(clone);
            });
        }
    }

    // Partners carousel infinite scroll
    const partnersCarousel = document.getElementById('partnersCarousel');
    
    if (partnersCarousel) {
        // Clone slides múltiplas vezes para scroll infinito suave
        const partnerSlides = Array.from(partnersCarousel.children);
        // Duplica 4 vezes para garantir loop perfeito
        for (let i = 0; i < 4; i++) {
            partnerSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                partnersCarousel.appendChild(clone);
            });
        }
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card, .product-slide, .partner-slide').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Phone mask for Brazilian format
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 10) {
                // Landline: (XX) XXXX-XXXX
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                // Mobile: (XX) XXXXX-XXXX
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            
            e.target.value = value;
        });
    });

    // CNPJ mask
    const cnpjInput = document.getElementById('cnpj');
    
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
            e.target.value = value;
        });
    }

    // Add hover effect to cards
    const cards = document.querySelectorAll('.feature-card, .partner-slide');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        const orcamentoModal = document.getElementById('orcamentoModal');
        const feedbackModal = document.getElementById('feedbackModal');
        
        if (e.target === orcamentoModal) {
            closeOrcamentoModal();
        }
        if (e.target === feedbackModal) {
            closeFeedbackModal();
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeOrcamentoModal();
            closeFeedbackModal();
        }
    });
});

// Hero carousel navigation
function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    
    slides[currentIndex].classList.remove('active');
    
    currentIndex += direction;
    
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    
    slides[currentIndex].classList.add('active');
}

// Open catalog function
function openCatalog() {
    window.open('IR2 ESTOQUE/IR2-CATALOGO-2026.pdf', '_blank');
}

// Scroll to contact function
function scrollToContact() {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Modal functions
function openOrcamentoModal() {
    const modal = document.getElementById('orcamentoModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeOrcamentoModal() {
    const modal = document.getElementById('orcamentoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Preload images
window.addEventListener('load', function() {
    const images = [
        'DISJUNTOR.png',
        'DISJUNTOR 10A.png',
        'REFLETOR 100W.png',
        'LAMPADA TUBULAR T8 18W.png',
        'TERMINAL ELETRICO.png',
        'ELGIN.png',
        'OUROLUX.png',
        'MAXITELECOM.png',
        'DECORLUX.png',
        'LUMANTI.png',
        'ILUMI.png',
        'LAMESA.png',
        'PLUZIE.png',
        'ENERBRAS.png',
        'MEGAACE.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add animation class on scroll for sections
const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial check

// Pause carousels on hover
const carousel = document.querySelector('.carousel-track');
if (carousel) {
    carousel.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

const partnersCarousel = document.querySelector('.carousel-partners');
if (partnersCarousel) {
    partnersCarousel.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    partnersCarousel.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Easter egg: Console message
console.log('%c⚡ I.R. Comércio e Materiais Elétricos LTDA', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cSite desenvolvido com excelência e atenção aos detalhes.', 'color: #666666; font-size: 14px;');
console.log('%cEntre em contato: contato@ircomercio.com.br', 'color: #FF6B35; font-size: 12px;');

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Keyboard navigation accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});
