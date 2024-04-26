function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}
document.addEventListener("DOMContentLoaded", function() {
    const title = document.querySelector('.title');
    const text = title.innerText;
    const typingSpeed = 100;
    let typingStarted = false;

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function typeWriter() {
        title.innerHTML = ""; 
        let i = 0;
        function nextLetter() {
            if (i < text.length) {
                title.innerHTML += text.charAt(i);
                i++;
                setTimeout(nextLetter, typingSpeed);
            }
        }
        nextLetter();
    }

    function checkAndStartTyping() {
        if (isInViewport(title)) {
            if (!typingStarted) {
                typingStarted = true; // flag before starting type
                typeWriter();
            }
        } else {
            typingStarted = false; // when its out of view, reset
        }
    }

    // limit the rate of execution
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    const debouncedCheck = debounce(checkAndStartTyping, 100);

    window.addEventListener('scroll', debouncedCheck);
    // check to see in case the element is already in view on load
    checkAndStartTyping();
});
