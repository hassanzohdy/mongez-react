/**
 * Scroll to the given query selector smoothly
 *
 * @param {string} querySelector
 */
function scrollTo(querySelector) {
    const element = document.querySelector(querySelector);
    if (!element)
        return;
    element.scrollIntoView({
        behavior: 'smooth'
    });
}

export default scrollTo;
