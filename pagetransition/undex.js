gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelectorAll('.cards');
const header = document.querySelector('#page2');
const animation = gsap.timeline();
let cardHeight;

function initCards() {
    animation.clear();
    cardHeight = cards[0].offsetHeight;
    console.log("initCards()", cardHeight);
    cards.forEach((card, index) => {
        if (index > 0) {
            gsap.set(card, { y: index * cardHeight });
            animation.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
        }
    });
}

function calculateTotalHeight() {
    const totalHeight = header.offsetHeight + Array.from(cards).reduce((acc, card) => acc + card.offsetHeight, 0);
    return `+=${totalHeight}`;
}

initCards();

ScrollTrigger.create({
    trigger: "#page2",
    start: "10% 10%",
    end: calculateTotalHeight,
    pin: true,
    scrub: true,
    animation: animation,
    // markers: true,
    invalidateOnRefresh: true,
});

ScrollTrigger.addEventListener("refreshInit", initCards);
