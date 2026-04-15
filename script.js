const header = document.querySelector("header");
const menuToggle = document.querySelector("#mobileMenuToggle");
const navLinksContainer = document.querySelector(".links");
const navLinks = document.querySelectorAll(".links a");

const isDesktop = () => window.matchMedia("(min-width: 992px)").matches;

const closeMenu = () => {
    header?.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
};

const openMenu = () => {
    header?.classList.add("menu-open");
    menuToggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
};

menuToggle?.addEventListener("click", () => {
    const isOpen = header?.classList.contains("menu-open");

    if (isOpen) {
        closeMenu();
        return;
    }

    openMenu();
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

document.addEventListener("click", (event) => {
    const target = event.target;

    if (!header?.classList.contains("menu-open")) return;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest(".mobile-menu")) return;
    if (target.closest(".links")) return;
    if (target.closest(".button")) return;

    closeMenu();
});

window.addEventListener("resize", () => {
    if (isDesktop()) {
        closeMenu();
    }
});

if (navLinksContainer) {
    navLinksContainer.setAttribute("aria-hidden", "true");
}

const observer = new MutationObserver(() => {
    const open = header?.classList.contains("menu-open");
    navLinksContainer?.setAttribute("aria-hidden", open ? "false" : "true");
});

if (header) {
    observer.observe(header, { attributes: true, attributeFilter: ["class"] });
}
