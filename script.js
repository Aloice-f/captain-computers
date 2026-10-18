
/* =========================================
   CAPTAIN COMPUTERS
   Website interactions and animations
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });
    }

    // 2. Hacker-style typing animation
    const typingElement = document.querySelector("#typing-text");

    if (typingElement) {
        const messages = [
            "Securing the Digital World...",
            "Detecting Cyber Threats...",
            "Protecting Your Data...",
            "Building a Safer Internet...",
            "Powering Your Digital Future..."
        ];

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            typingElement.textContent = messages[0];
        } else {
            let messageIndex = 0;
            let charIndex = 0;
            let deleting = false;

            function typeEffect() {
                const currentMessage = messages[messageIndex];

                typingElement.textContent =
                    currentMessage.substring(0, charIndex);

                if (!deleting) {
                    charIndex++;

                    if (charIndex > currentMessage.length) {
                        deleting = true;
                        setTimeout(typeEffect, 1300);
                        return;
                    }
                } else {
                    charIndex--;

                    if (charIndex < 0) {
                        deleting = false;
                        charIndex = 0;
                        messageIndex =
                            (messageIndex + 1) % messages.length;
                    }
                }

                setTimeout(typeEffect, deleting ? 35 : 75);
            }

            typeEffect();
        }
    }

    // 3. Live digital clock
    const clock = document.querySelector("#cyber-clock");

    function updateClock() {
        if (clock) {
            clock.textContent = new Date().toLocaleTimeString();
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    // 4. Search services
    const searchInput = document.querySelector("#search");
    const serviceCards = document.querySelectorAll(
        "#serviceList .card"
    );
    const noResults = document.querySelector("#no-results");

    if (searchInput) {
        function searchServices() {
            const query = searchInput.value.trim().toLowerCase();
            let visibleCount = 0;

            serviceCards.forEach(card => {
                const matches = card.textContent
                    .toLowerCase()
                    .includes(query);

                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }
            });

            if (noResults) {
                noResults.hidden = visibleCount !== 0;
            }
        }

        searchInput.addEventListener("input", searchServices);
    }

    // 5. Scroll reveal animation
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // 6. Navbar scroll effect
    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (navbar) {
            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );
        }
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();

    // 7. Animated statistics counters
    const counters = document.querySelectorAll("[data-count]");

    function animateCounter(counter) {
        const target = Number(counter.dataset.count);

        if (!Number.isFinite(target) || target < 0) {
            return;
        }

        const duration = 1500;
        const start = performance.now();

        function updateCounter(now) {
            const progress = Math.min(
                (now - start) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 3);

            counter.textContent = Math.floor(
                target * eased
            ).toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        counters.forEach(animateCounter);
    }

    // 8. Cyber terminal demo
    const terminal = document.querySelector("#terminal-output");
    const terminalButton = document.querySelector("#run-scan");

    if (terminal && terminalButton) {
        let scanRunning = false;
        let scanTimeouts = [];

        terminalButton.addEventListener("click", () => {
            if (scanRunning) return;

            scanRunning = true;
            terminalButton.disabled = true;
            terminalButton.textContent = "Demo Running...";

            scanTimeouts.forEach(clearTimeout);
            scanTimeouts = [];
            terminal.textContent = "";

            const lines = [
                "> Initializing demo diagnostics...",
                "> Checking page interface...",
                "> Analyzing demo security indicators...",
                "> Reviewing website interaction status...",
                "> Demo scan complete.",
                "> No real device or network scan was performed."
            ];

            lines.forEach((line, index) => {
                const timeout = setTimeout(() => {
                    terminal.textContent += line + "\n";

                    if (index === lines.length - 1) {
                        scanRunning = false;
                        terminalButton.disabled = false;
                        terminalButton.textContent = "Run Demo Scan";
                    }
                }, index * 600);

                scanTimeouts.push(timeout);
            });
        });
    }

    // 9. Back-to-top button
    const backToTop = document.querySelector("#back-to-top");

    if (backToTop) {
        function updateBackToTop() {
            backToTop.hidden = window.scrollY < 300;
        }

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        updateBackToTop();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });
        });
    }

    // 10. Automatically update footer year
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 11. Console message
    console.log(
        "%c CAPTAIN COMPUTERS ONLINE ",
        "background:#25D366;color:#050505;font-weight:bold;padding:8px;"
    );
});
