const leftNavButton = document.getElementsByClassName('left-nav-button')[0];
const rightNavButton = document.getElementsByClassName('right-nav-button')[0];
const scrollDistance = 200;

leftNavButton.addEventListener('click', () => {
    document.getElementsByClassName('gallery-row')[0].scrollLeft -= scrollDistance;
})
rightNavButton.addEventListener('click', () => {
    document.getElementsByClassName('gallery-row')[0].scrollLeft += scrollDistance;
})