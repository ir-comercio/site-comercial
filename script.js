// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
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
            
            console.log('Form data:', data);
        });
    }

    // Orçamento form submission
    const orcamentoForm = document.getElementById('orcamentoForm');
    
    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Solicitação de orçamento enviada com sucesso! Entraremos em contato em breve.');
            
            this.reset();
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
            
            alert('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
            
            this.reset();
            stars.forEach(s => s.classList.remove('active'));
            closeFeedbackModal();
            
            console.log('Feedback enviado');
        });
    }

    // Partners carousel infinite scroll
    const partnersCarousel = document.getElementById('partnersCarousel');
    
    if (partnersCarousel) {
        const partnerSlides = Array.from(partnersCarousel.children);
        const originalCount = partnerSlides.length;
        
        partnerSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            partnersCarousel.appendChild(clone);
        });
        
        console.log(`Partners carousel: ${originalCount} slides duplicated to ${originalCount * 2}`);
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
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
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
        'REFLETOR.png',
        'PRODUTOS/LAMPADA.png',
        'PRODUTOS/LAMPADA-TUBULAR.png',
        'PRODUTOS/REFLETOR.png',
        'PRODUTOS/RJ45.png',
        'PRODUTOS/KEYSTONE.png'
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
animateOnScroll();

// Pause carousels on hover
const carousel = document.querySelector('.carousel-partners');
if (carousel) {
    carousel.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Easter egg: Console message
console.log('%c⚡ IR2 Comércio e Materiais Elétricos', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cSite desenvolvido com excelência e atenção aos detalhes.', 'color: #9CA3AF; font-size: 14px;');

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

// Intersection Observer para scroll animations
(function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                const children = entry.target.querySelectorAll('.scroll-animate');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('.section-header').forEach(header => {
        observer.observe(header);
    });

    document.querySelectorAll('.feature-card, .product-slide').forEach(card => {
        observer.observe(card);
    });

    // Efeito de clique nos botões (ripple effect)
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-catalog, .btn-submit').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar com background ao rolar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Adicionar classe 'revealed' nos elementos visíveis no carregamento
    setTimeout(() => {
        const viewportHeight = window.innerHeight;
        document.querySelectorAll('.section-header').forEach(header => {
            const rect = header.getBoundingClientRect();
            if (rect.top < viewportHeight) {
                header.classList.add('revealed');
            }
        });
    }, 100);

})();

// CSS para ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Duplicar slides do carrossel de órgãos
(function() {
    const orgaosCarousel = document.getElementById('orgaosCarousel');
    if (orgaosCarousel) {
        const slides = Array.from(orgaosCarousel.children);
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            orgaosCarousel.appendChild(clone);
        });
    }
})();

// ===== CARROSSEL DE PRODUTOS NO HERO - CORRIGIDO =====
(function() {
    const slider = document.getElementById('productsSlider');
    if (!slider) {
        console.log('Slider não encontrado');
        return;
    }
    
    const items = slider.querySelectorAll('.product-item');
    if (items.length === 0) {
        console.log('Nenhum item de produto encontrado');
        return;
    }
    
    console.log(`Carrossel iniciado com ${items.length} produtos`);
    
    let currentIndex = 0;
    
    // Garantir que o primeiro item esteja ativo inicialmente
    items.forEach((item, index) => {
        item.classList.remove('active');
    });
    items[0].classList.add('active');
    
    function showNextProduct() {
        // Remover active do item atual
        items[currentIndex].classList.remove('active');
        
        // Avançar para o próximo item
        currentIndex = (currentIndex + 1) % items.length;
        
        // Adicionar active ao novo item
        items[currentIndex].classList.add('active');
        
        const imgSrc = items[currentIndex].querySelector('img')?.getAttribute('src');
        console.log(`Mostrando produto ${currentIndex + 1} de ${items.length}: ${imgSrc}`);
    }
    
    // Trocar produto a cada 3 segundos
    setInterval(showNextProduct, 3000);
    console.log('Carrossel automático iniciado (intervalo: 3 segundos)');
})();

// Toggle form type function
function toggleFormType(type) {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const empresaField = document.getElementById('empresaField');
    
    toggleButtons.forEach(btn => btn.classList.remove('active'));
    
    if (type === 'fisica') {
        toggleButtons[0].classList.add('active');
        if (empresaField) empresaField.style.display = 'none';
    } else {
        toggleButtons[1].classList.add('active');
        if (empresaField) empresaField.style.display = 'flex';
    }
}
