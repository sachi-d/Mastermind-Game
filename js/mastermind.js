(function init() {
    initializeBoard();
    initializeToolbar();
    Game.colorCode = setNewCode();
    activePeg = 0;
    activeRow = -1;
    updateRowDisplay();
}());

function initializeBoard() {
    var $board = $("#board");

    var blankPeg = "images/blank.jpg",
        blankResult = "images/blank.png";

    //add 10 rows
    for (var i = 0; i < 10; i++) {
        var $boardRow = $("<div>", {
            id: "row-" + i,
            class: "row mm-row board-row"
        });

        //add the empty pegs
        var $pegBar = $("<div>", {
            class: "mm-block peg-bar"
        });
        for (var j = 0; j < 4; j++) {
            var $peg = $('<img>', {
                class: "peg",
                id: "peg-" + i + "-" + j,
                src: blankPeg,
                width: '40'
            });
            $pegBar.append($peg);
        }
        $boardRow.append($pegBar);

        //add the result box
        var $resultBox = $("<div>", {
            class: "mm-block result-bar"
        });
        //add 2 rows of 2 squares each
        for (var k = 0; k < 2; k++) {
            var $resRow = $("<div class='row mm-row result-row'></div>");
            for (var kk = 0; kk < 2; kk++) {
                var $res = $("<img>", {
                    class: "result",
                    id: "result-" + i + "-" + Number(k * 2 + kk),
                    src: blankResult,
                    width: 20
                });
                $resRow.append($res);
            }
            $resultBox.append($resRow);
        }
        $boardRow.append($resultBox);

        $board.append($boardRow);

    }
}

function initializeToolbar() {
    var $colorbuttons = $("#color-buttons");

    for (var key of Object.keys(Game.colors)) {
        var $button = $('<input>', {
            type: 'image',
            id: key,
            src: Game.colors[key].src,
            width: '40',
            onclick: 'updatePegs(this)'
        });
        $colorbuttons.append($button);
    }
}

//click function of pegs
function updatePegs(clicked) {
    if (activePeg < 4) {
        $("#peg-" + activeRow + "-" + activePeg).attr("src", Game.colors[clicked.id].src);

        tempColCode[activePeg] = clicked.id;
        activePeg++;

        if (activePeg === 4) {
            Game.checkButton.prop('disabled', false);
        }
    }

}

//check the pattern of row
function checkRow() {
    //The logic of the game

    //calculating black and white dots
    var dots = [],
        blackCount = 0;
    tempColCode.map(function (userColor, index) {
        if (Game.colorCode[index] == userColor) {
            dots.push("blackButton");
            blackCount++;
        } else {
            if (Game.colorCode.indexOf(userColor) > -1) {
                dots.push("whiteButton");
            }
        }
    });

    dots.map(function (butn, index) {
        $("#result-" + activeRow + "-" + index).attr("src", Game[butn]);
    });

    //check if all 4 combinations are black
    if (blackCount === 4) {
        alert("You have won the game!");
    } else {
        if (activeRow === 9) {
            alert("Sorry try again");
        }
    }

    tempColCode = [];
    updateRowDisplay();
}

function updateRowDisplay() {
    Game.checkButton.prop('disabled', true);
    $("#row-" + activeRow).css({
        "border-color": "#c9c9c9"
    });
    activePeg = 0;
    activeRow++;
    $("#row-" + activeRow).css({
        "border-color": "red"
    });
}

function loadNewGame() {

}


//generate new color pattern
function setNewCode() {
    var colorKeys = Object.keys(Game.colors);
    var keyGen = [];
    for (var i = 0; i < 4; i++) {
        keyGen.push(colorKeys[Math.floor(Math.random() * colorKeys.length)]);
    }
    console.log(keyGen);
    return keyGen;
}
