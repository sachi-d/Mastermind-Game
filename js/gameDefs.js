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
    colorCode: ["red", "red", "red", "red"]
}

var activeRow = 0,
    activePeg = 0,
    tempColCode = [];
