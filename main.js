window.addEventListener('load', main);

let g = new MSGame();
let t = 0;
let num_clicks = 0;

function startTimer() {
    if (num_clicks === 1) {
        timer = setInterval(function () {
            t++;
            document.getElementById("timer").innerHTML = ("999" - t).toString();
        }, 1000);
    }
}

function stopTimer() {
    if (timer) {
        window.clearInterval(timer);
        document.getElementById("timer").innerHTML = "999";
    }
}

function hideTimerandFlag(){
    document.querySelector("#timer").style.visibility = "hidden";
    document.querySelector(".clock").style.visibility = "hidden";
    document.querySelector(".flag").style.visibility = "hidden";
    document.querySelector("#numflags").innerHTML = "";
}

function generateGrid() {
    let array = g.getRendering();
    let status = g.getStatus();
    let grid = document.querySelector(".grid");
    let numflags = status.nmines - status.nmarked;
    grid.innerHTML = "";
    t = 0;
    num_clicks = 0;
    grid.style.gridTemplateColumns = `repeat(${status.ncols}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${status.nrows}, 1fr)`;

    if(status.exploded === true){
        hideTimerandFlag();
        console.log("You lost!");
        array = g.getRendering();
        for (let row = 0; row < status.nrows; row++) {
            for (let col = 0; col < status.ncols; col++) {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = " ";
                card.setAttribute("row", row);
                card.setAttribute("col", col);
                card.addEventListener("mousedown", function (e){
                    if (e.button === 0) {
                        //left click
                        g.uncover(row, col);
                        array = g.getRendering();
                        generateGrid();
                        num_clicks ++;
                        if(num_clicks === 1) {
                            startTimer();
                        }
                    }
                });
                card.addEventListener("contextmenu", function (e) {
                    e.preventDefault();
                    g.mark(row, col);
                    array = g.getRendering();
                    generateGrid();
                    return false;
                }, false);

                grid.appendChild(card);

                if (array[row][col] === "H") {
                    card.style.display = "block";
                } else if (array[row][col] === "F") {
                    card.classList.add("mark");
                }else if (array[row][col] === "M") {
                    card.classList.add("bomb");
                } else if (array[row][col] >= 0 || array[row][col] <= 8) {
                    if (array[row][col] == 0) {
                        card.classList.add("zero");
                    }
                    if (array[row][col] == 1) {
                        card.classList.add("one");
                    }
                    if (array[row][col] == 2) {
                        card.classList.add("two");
                    }
                    if (array[row][col] == 3) {
                        card.classList.add("three");
                    }
                    if (array[row][col] == 4) {
                        card.classList.add("four");
                    }
                    if (array[row][col] == 5) {
                        card.classList.add("five");
                    }
                    if (array[row][col] == 6) {
                        card.classList.add("six");
                    }
                    if (array[row][col] == 7) {
                        card.classList.add("seven");
                    }
                    if (array[row][col] == 8) {
                        card.classList.add("eight");
                    }

                }
            }
        }
        //lostMessage.innerHTML = "You lost! Click anywhere to start a new game";

        let lostMessage = document.getElementById("lostMsg");
        lostMessage.innerHTML = "You lost! Click anywhere to start a new game";
        lostMessage.style.visibility = "visible";
        document.addEventListener("click",  () => {
            lostMessage.style.visibility = "hidden";
            startTimer();
            main();
        });


    } else if (status.exploded === false && status.done === true){
        hideTimerandFlag();
        console.log("You won!");
        //show that the user has won
        document.getElementById("winMsg").innerHTML = "You won! Click anywhere to start a new game";
    }else{
        document.querySelector(".clock").style.visibility = "visible";
        document.querySelector(".flag").style.visibility = "visible";
        document.querySelector("#numflags").innerHTML = numflags.toString();
        for (let row = 0; row < status.nrows; row++) {
            for (let col = 0; col < status.ncols; col++) {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = " ";
                card.setAttribute("row", row);
                card.setAttribute("col", col);
                card.addEventListener("mousedown", function (e){
                    if (e.button === 0) {
                        //left click
                        g.uncover(row, col);
                        array = g.getRendering();
                        generateGrid();
                        num_clicks ++;
                        if(num_clicks === 1) {
                            startTimer();
                        }
                    }
                });
                card.addEventListener("contextmenu", function (e) {
                    e.preventDefault();
                    g.mark(row, col);
                    array = g.getRendering();
                    generateGrid();
                    return false;
                }, false);

                grid.appendChild(card);

                if (array[row][col] === "H") {
                    card.style.display = "block";
                } else if (array[row][col] === "F") {
                    card.classList.add("mark");
                } else if (array[row][col] >= 0 || array[row][col] <= 8) {
                    if (array[row][col] == 0) {
                        card.classList.add("zero");
                    }
                    if (array[row][col] == 1) {
                        card.classList.add("one");
                    }
                    if (array[row][col] == 2) {
                        card.classList.add("two");
                    }
                    if (array[row][col] == 3) {
                        card.classList.add("three");
                    }
                    if (array[row][col] == 4) {
                        card.classList.add("four");
                    }
                    if (array[row][col] == 5) {
                        card.classList.add("five");
                    }
                    if (array[row][col] == 6) {
                        card.classList.add("six");
                    }
                    if (array[row][col] == 7) {
                        card.classList.add("seven");
                    }
                    if (array[row][col] == 8) {
                        card.classList.add("eight");
                    }

                }
            }
        }
    }
}


function main() {
    console.log("MineSweeper is starting");
    let html = document.querySelector("html");
    console.log("Your render area:", html.clientWidth, "x", html.clientHeight);

    // register callbacks for buttons
    //this is the first time the game starts
    document.querySelectorAll(".menuButton").forEach((button) => {
        let level = button.getAttribute("data-mode");
        button.innerHTML = `${level}`;
        button.addEventListener("click", function () {
            stopTimer();
            if (level === "Easy") {
                g.init(8, 10, 10);
                generateGrid();
            } else if (level === "Medium") {

                g.init(14, 18, 40);
                generateGrid();
            } else if (level === "Hard") {
                g.init(20, 24, 99);
                generateGrid();
            }
        });
        //Initiate the board in easy mode, allow user to choose which mode they want to select
        g.init(8, 10, 10);
        generateGrid();
    });


}
