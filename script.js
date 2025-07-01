// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hidden');
    });

    // Navigation scroll effect
    const nav = document.querySelector('.mimic-nav') || document.querySelector('.alt-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinkElements = document.querySelectorAll('.nav-links a');
    navLinkElements.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileNavToggle.classList.contains('active')) {
                mobileNavToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Feature tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Example tabs functionality
    const exampleTabs = document.querySelectorAll('.example-tab');
    const examplePanes = document.querySelectorAll('.example-pane');

    exampleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and panes
            exampleTabs.forEach(t => t.classList.remove('active'));
            examplePanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding example pane
            const paneId = this.getAttribute('data-tab');
            document.getElementById(paneId).classList.add('active');
        });
    });

    // Mimic demo functionality
    const analyzeBtn = document.querySelector('.mimic-analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const usernameInput = document.querySelector('.mimic-search input');
            const username = usernameInput.value.trim();
            
            if (username) {
                // Show loading state
                analyzeBtn.textContent = 'Analyzing...';
                analyzeBtn.disabled = true;
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Reset button state
                    analyzeBtn.textContent = 'Analyze';
                    analyzeBtn.disabled = false;
                    
                    // Show result (in a real app, this would come from the API)
                    const result = document.querySelector('.mimic-result');
                    if (result) {
                        result.classList.add('active');
                    }
                }, 1500);
            }
        });
    }

    // Tweet regeneration functionality
    const regenerateButtons = document.querySelectorAll('.btn-tweet-action');
    regenerateButtons.forEach(button => {
        if (button.querySelector('i.fa-sync-alt')) {
            button.addEventListener('click', function() {
                const tweetElement = this.closest('.generated-tweet').querySelector('p');
                const originalText = tweetElement.textContent;
                
                // Show loading state
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Regenerating';
                button.disabled = true;
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Reset button state
                    button.innerHTML = '<i class="fas fa-sync-alt"></i> Regenerate';
                    button.disabled = false;
                    
                    // Update tweet text with new content
                    const tweets = [
                        "Just finished reviewing the latest neural network architecture. Impressive results. The future of AI is looking bright!",
                        "Had an amazing conversation with the team about renewable energy. We need to accelerate the transition to sustainable power generation.",
                        "Thinking about the implications of quantum computing for encryption. We might need entirely new security paradigms sooner than expected.",
                        "The stars look particularly beautiful from Earth. Reminds me why we need to protect this planet while we explore others."
                    ];
                    
                    // Select a random tweet that's different from the current one
                    let newTweet;
                    do {
                        newTweet = tweets[Math.floor(Math.random() * tweets.length)];
                    } while (newTweet === originalText && tweets.length > 1);
                    
                    tweetElement.textContent = newTweet;
                }, 1000);
            });
        } else if (button.querySelector('i.fa-copy')) {
            button.addEventListener('click', function() {
                const tweetText = this.closest('.generated-tweet').querySelector('p').textContent;
                
                // Copy to clipboard
                navigator.clipboard.writeText(tweetText).then(() => {
                    const originalHTML = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                    }, 2000);
                });
            });
        }
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on page load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);

    // Typed.js animation for dynamic text
    if (typeof Typed !== 'undefined') {
        const typedElement = document.getElementById('typed-text');
        if (typedElement) {
            new Typed('#typed-text', {
                strings: ['tweets', 'content', 'engagement', 'growth'],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 1500,
                startDelay: 500,
                loop: true
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Counter animation for statistics
    const counters = document.querySelectorAll('[data-count]');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const counterInterval = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(counterInterval);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Start counter animation when element is in viewport
    function checkCounters() {
        counters.forEach(counter => {
            const position = counter.getBoundingClientRect();
            
            if (position.top < window.innerHeight && position.bottom >= 0 && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    // Check counters on scroll
    window.addEventListener('scroll', checkCounters);
    
    // Initial check
    checkCounters();

    // Add hover effect to bento items
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });

    // Reveal elements on scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach((el) => {
        revealObserver.observe(el);
    });

    // Add copy functionality to code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        
        copyButton.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });
        
        block.appendChild(copyButton);
    });
});

// Add CSS class when the page is fully loaded to trigger animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize AOS library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
}); 