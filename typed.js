"use strict";
function Typed() {
    document.querySelectorAll('.typed').forEach( function (element) {
        const attributes = Array.from(element.querySelector('.typed-texts').attributes);
        const attributesObj = {};
        attributes.forEach(function (attribute) {
            let name = attribute.name;
            let value = attribute.value;
            if( name.startsWith(/typed-[a-z][a-z]*/i.exec(name)) && (name.endsWith(/-[a-z][a-z]*/i.exec(name)) || name.endsWith(/-[a-z][a-z]*-[a-z]*/i.exec(name))) && (!value == '') && value == /[a-z0-9]*/i.exec(value) ) {
                name = name.replace(/typed-/i, '').replace(/-([a-z])/gi, i => i.slice(1).toUpperCase());
                attributesObj[name] = value;
            }
        });

        typed(element, attributesObj);
    });

    function typed(element, attributes) {
        const {
                startDelay = 0,
                typeSpeed  = 0,
                nextDelay  = 50,
                backDelay  = 1500,
                backSpeed  = 0,
                showCursor = 'true',
                cursorBlink = 'true',
                inEffect   = '',
                outEffect  = '',
        } = attributes;

        element.insertAdjacentHTML('afterbegin', `<span class="text-typed"><span></span></span>`);
        const textTyped = element.querySelector('.text-typed span');
        
        if (showCursor == 'false') {
            textTyped.classList.add('cursor-hide');
        }

        if (showCursor == 'true' && cursorBlink == 'true') {
            textTyped.classList.add('blink');
        }

        if (!element.querySelector('.typed-texts .typed-text.current')) {
            element.querySelector('.typed-texts .typed-text').classList.add('current');
        }
        let width = 0;

        function takeNext () {
            const typedTexts = element.querySelectorAll('.typed-texts .typed-text');
            const typedText = element.querySelector('.typed-texts .typed-text.current');
            if (typedText.nextElementSibling) {
                if (typedText.classList.contains('current')) {
                    typedText.classList.remove('current');
                    typedText.nextElementSibling.classList.add('current');
                }
            } else {
                typedText.classList.remove('current');
                typedTexts[0].classList.add('current');
            }
        }

        function type () {
            textTyped.innerText = element.querySelector('.typed-texts .typed-text.current').innerHTML;
            const textTypedWidth = textTyped.scrollWidth + 10;
            
            const type = setInterval(() => {
                if (inEffect == 'clipIn') {
                    let percent = Math.floor((width / textTypedWidth) * 100);
                    if (percent <= 30) {
                        width += 1.40;
                    } else if (percent <= 35) {
                        width += 1.35;
                    } else if (percent <= 40) {
                        width += 1.30;
                    } else if (percent <= 45) {
                        width += 1.25;
                    } else if (percent <= 50) {
                        width += 1.20;
                    } else if (percent <= 55) {
                        width += 1.15;
                    } else if (percent <= 60) {
                        width += 1.10;
                    }  else if (percent <= 65) {
                        width += 1.05;
                    } else {
                        width += 1;
                    }
                } else {
                    width += 1;
                }

                if (textTypedWidth >= width) {
                    textTyped.style.width = width +'px';
                } else {
                    clearInterval(type);
                    setTimeout(() => {
                        erase();
                    }, backDelay);
                }
            }, typeSpeed);
        }
        
        const typeStart = setInterval(() => {
            type();
            clearInterval(typeStart);
        }, startDelay);

        function erase () {
            const textTypedWidth = textTyped.scrollWidth + 10;
            const erase = setInterval(() => {
                if (outEffect == 'clipOut') {
                    let percent = Math.floor((width / textTypedWidth) * 100);
                    if (percent >= 70) {
                        width -= 1.40;
                    } else if (percent >= 65) {
                        width -= 1.35;
                    } else if (percent >= 60) {
                        width -= 1.30;
                    } else if (percent >= 55) {
                        width -= 1.25;
                    } else if (percent >= 50) {
                        width -= 1.20;
                    } else if (percent >= 45) {
                        width -= 1.15;
                    } else if (percent <= 40) {
                        width -= 1.10;
                    } else if (percent <= 35) {
                        width -= 1.05;
                    } else {
                        width -= 1;
                    }
                }  else {
                    width -= 1;
                }

                if (width > 0) {
                    textTyped.style.width = width +'px';
                } else {
                    clearInterval(erase);
                    takeNext();
                    setTimeout(() => {
                        type();
                    }, nextDelay);
                }
            }, backSpeed);
        }
        
    }
}

Typed();