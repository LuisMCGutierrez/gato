let turn = false;
let buttons = document.querySelectorAll('button#cell')
let resetButton = document.getElementById('Reset')
let winner = ""
let tie = false

resetButton.onclick = () => {
    buttons.forEach(button => {
        button.innerHTML = ""
        button.onclick = () => fillValidation(button)
    });
    winner = ""
    tie = false
}
function comprobations(button) {
    let option = button.innerHTML
    let check = []
    switch (button.className) {
        case "00":
            check = [["01", "02"], ["10", "20"], ["11", "22"]]
            gameStatus(check, option)
            break;
        case "01":
            check = [["00", "02"], ["11", "21"]]
            gameStatus(check, option)
            break;
        case "02":
            check = [["01", "00"], ["12", "22"], ["11", "20"]]
            gameStatus(check, option)
            break;
        case "10":
            check = [["00", "02"], ["11", "12"]]
            gameStatus(check, option)
            break;
        case "11":
            check = [["00", "22"], ["02", "20"], ["01", "21"], ["10", "12"]]
            gameStatus(check, option)
            break;
        case "12":
            check = [["22", "02"], ["10", "11"]]
            gameStatus(check, option)
            break;
        case "20":
            check = [["10", "00"], ["21", "22"], ["11", "02"]]
            gameStatus(check, option)
            break;
        case "21":
            check = [["20", "22"], ["11", "01"]]
            gameStatus(check, option)
            break;
        case "22":
            check = [["21", "20"], ["12", "02"], ["11", "00"]]
            gameStatus(check, option)
            break;

        default:
            break;
    }
    if (winner) {
        console.log(`the winner is "${winner}"`)
        buttons.forEach(button => {
            button.onclick = () => { }
        })
    }
    if (tie && !winner) {
        console.log(`fue un empate`)
    }
}

function gameStatus(check, option) {

    for (let coordinates of check) {
        buttonsArray = Array.from(buttons)
        let buttonCoordinate1 = buttonsArray.find(button => button.className == coordinates[0]).innerHTML
        let buttonCoordinate2 = buttonsArray.find(button => button.className == coordinates[1]).innerHTML

        if (buttonCoordinate1 && buttonCoordinate2) {
            //console.log(buttonCoordinate1, buttonCoordinate2)
            if (buttonCoordinate1 == option && buttonCoordinate2 == option) {
                console.log(buttonCoordinate1, buttonCoordinate2)
                console.log(coordinates)
                winner = option;
            } else {
                tie = buttonsArray.some(button => button.innerHTML == "")
                tie = !tie
            }
        }
    }
}

function fillValidation(button) {
    if (button.innerHTML) {
        console.log("can't fill an filled spaces")
    } else {
        fill(button)
        comprobations(button)
    }
}

function fill(button) {
    if (turn) {
        button.innerHTML = "x"
        turn = !turn
    } else {
        button.innerHTML = "o"
        turn = !turn
    }
    //console.log(button.className)
}

buttons.forEach(button => {
    button.onclick = () => fillValidation(button)
})