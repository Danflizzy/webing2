document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.querySelector(".button-container");
    const h1 = document.getElementById('typewriter-h1');
    const h2 = document.getElementById('typewriter-h2');


    // Function to create a trailing heart
    function createTrailingHeart(x, y, index) {
        const trailingHeart = document.createElement('div');
        trailingHeart.className = 'trailing-heart';

        trailingHeart.style.left = x + 'px';
        trailingHeart.style.top = y + 'px';

        document.body.appendChild(trailingHeart);

        void trailingHeart.offsetWidth;

        trailingHeart.style.transform = `translate(-50%, -50%) scale(0)`;
        trailingHeart.style.opacity = '0';

        setTimeout(() => {
            trailingHeart.remove();
        }, 500 * index);
    }

    const activeHearts = [];

    // Update the position of the trailing hearts based on the mouse movement
    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const heartIndex = activeHearts.length;
        createTrailingHeart(mouseX, mouseY, heartIndex);
        activeHearts.push(heartIndex);

        if (activeHearts.length > 5) {
            const oldestHeartIndex = activeHearts.shift();
            const oldestHeart = document.querySelector('.trailing-heart:nth-child(' + oldestHeartIndex + ')');
            if (oldestHeart) {
                oldestHeart.remove();
            }
        }
    });

    // Function to create a pulsing heart
    function createPulsingHeart() {
        const heartContainer = document.createElement('div');
        heartContainer.className = 'heart-container';

        const heart = document.createElement('div');
        heart.className = 'heart';

        heartContainer.appendChild(heart);

        document.body.appendChild(heartContainer);
    }

    function typeWriter(element, text, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                const currentSpeed = text[i] === '.' ? speed / 3 : speed;

                if (text[i] === ',' || text[i] === '.') {
                    element.innerHTML += text[i] + '<br>';
                } else {
                    element.innerHTML += text[i];
                }

                i++;
                setTimeout(type, currentSpeed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    createPulsingHeart();

    // Start typing "Stephanie Vishnay" with a faster speed
    typeWriter(h1, "Dear Stephanie Vishnay,", 50, function () {
        // After typing "Stephanie Vishnay", start typing the poem
        setTimeout(function () {
            const poemLines = [
                "In the whisper of dawn, our journey unfurls,",
                "A dance of fate, where destiny twirls.",
                "With every breath, a promise anew,",
                "So here I stand, with a question for you."
            ];            

            let lineIndex = 0;

            function typePoemLine() {
                const currentLine = poemLines[lineIndex];
                typeWriter(h2, currentLine, 75, function () {
                    lineIndex++;
                    if (lineIndex < poemLines.length) {
                        setTimeout(typePoemLine, 1500);
                    } else {
                        setTimeout(function () {
                            h2.innerHTML = '';
                            typeWriter(h2, "Will you be my valentine?", 75, function () {
                                h2.innerHTML += '<br>';
                                setTimeout(function () {
                                    typeWriter(h2, "Just you and me?", 75, function () {
                                        // Display buttons after typing "Just you and me?"
                                        setTimeout(function () {
                                            buttonContainer.style.display = 'flex';
                                        }, 2000);
                                    });
                                }, 2000);
                            });
                        }, 1000);
                    }
                });
            }

            // Start typing the poem after a delay
            typePoemLine();
        }, 2000); // Delay before typing the poem
    });

    // Hide the button container initially
    buttonContainer.style.display = 'none';

    // Replace with your actual button references
    const YesButton = document.getElementById('YesButton');
    const NoButton = document.getElementById('NoButton');
    let noButtonClickCount = 0;

    function moveNoButton() {
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);

        NoButton.style.position = 'absolute';
        NoButton.style.left = randomX + 'px';
        NoButton.style.top = randomY + 'px';
        buttonContainer.style.flexDirection = 'column';
    }

    function displayGif() {
        document.body.innerHTML = '';
    
        const gif = document.createElement('img');
        gif.src = 'giphy.gif';
    
        document.body.appendChild(gif);
        document.body.style.backgroundColor = 'white';
    }    

    YesButton.addEventListener('click', function () {
        alert('Yayyy :)');
        NoButton.style.position = 'static';
        buttonContainer.style.flexDirection = 'row';

        document.body.innerHTML = '';

        displayGif();
    });

    NoButton.addEventListener('click', function () {
        noButtonClickCount++;

        moveNoButton();
        if (noButtonClickCount === 3) {
            alert('Dey Play! :(');
            noButtonClickCount = 0;
        }
    });
});
