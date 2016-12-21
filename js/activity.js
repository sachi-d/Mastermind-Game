define(function (require) {
    var activity = require("sugar-web/activity/activity");
    require("jquery");
    require("bootstrap");
    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        //        // Colorize the activity icon.
        var activityButton = document.getElementById("activity-button");
        activity.getXOColor(function (error, colors) {
            icon.colorize(activityButton, colors);
        });

        // Make the activity stop with the stop button.
        var stopButton = document.getElementById("stop-button");
        stopButton.addEventListener('click', function (e) {
            activity.close();
        });

        document.getElementById("retry-row").addEventListener('click', function (e) {
            retryRow();
        });

        document.getElementById("check-row").addEventListener('click', function (e) {
            checkRow();
        });

        document.getElementById("load-game").addEventListener('click', function (e) {
            loadNewGame();
        });

        document.getElementById("show-solution").addEventListener('click', function (e) {
            showSolution();
        });

        $("#show-solution").attr("disabled", false);

        var Game = {
            colors: {
                red: {
                    src: "images/red.gif"
                },
                orange: {
                    src: "images/orange.gif"
                },
                yellow: {
                    src: "images/yellow.gif"
                },
                green: {
                    src: "images/green.gif"
                },
                blue: {
                    src: "images/blue.gif"
                },
                purple: {
                    src: "images/purple.gif"
                }
            },
            blackButton: "images/black.png",
            whiteButton: "images/white.jpg",
            checkButton: $("#check-row"),
            blankPeg: "images/blank.jpg",
            blankResult: "images/blank.png",
            colorCode: ["red", "red", "red", "red"]
        };

        var activeRow = 0,
            activePeg = 0,
            tempColCode = [];

        loadNewGame();

        function initGame() {
            initializeBoard();
            initializeToolbar();
            Game.colorCode = setNewCode();
            activePeg = 0;
            activeRow = -1;
            updateRowDisplay();
        }

        function initializeBoard() {
            var $board = $("#board");

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
                        src: Game.blankPeg,
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
                            src: Game.blankResult,
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
            if ($colorbuttons.children().length > 0) {
                return;
            }
            for (var key of Object.keys(Game.colors)) {
                var $button = $('<input>', {
                    type: 'image',
                    id: key,
                    src: Game.colors[key].src,
                    width: '40'
                });
                $button.on("click", function () {
                    updatePegs(this);
                });
                $colorbuttons.append($button);
            }
        }

        //click function of pegs
        function updatePegs(color) {
            if (activePeg < 4) {
                $("#peg-" + activeRow + "-" + activePeg).attr("src", Game.colors[color.id].src);

                tempColCode[activePeg] = color.id;
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
            $("#board").empty();
            $("#solution").empty();
            initGame();
        }

        function retryRow() {
            for (var i = 0; i < 4; i++) {
                $("#peg-" + activeRow + "-" + i).attr("src", Game.blankPeg);
            }
            activePeg = 0;
        }

        //generate new color pattern
        function setNewCode() {
            var colorKeys = Object.keys(Game.colors);
            var keyGen = [];
            for (var i = 0; i < 4; i++) {
                keyGen.push(colorKeys[Math.floor(Math.random() * colorKeys.length)]);
            }
            return keyGen;
        }

        //display solution
        function showSolution() {
            $solution = $("#solution");
            $solution.empty();
            $solution.append("<p>Solution: <br></p>");
            Game.colorCode.map(function (col) {
                var $peg = $('<img>', {
                    class: "peg",
                    src: Game.colors[col].src,
                    width: '40'
                });
                $solution.append($peg);
            });
        }

    });
});
