"use strict";
let result = 0;
let keyVal1 = undefined;
let keyVal2 = undefined;
let operator = undefined;
const constructCalculation = (key) => {
    switch (key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            if (operator === undefined) {
                if (keyVal1 === undefined) {
                    keyVal1 = key;
                }
                else {
                    keyVal1 += key;
                }
                keyVal1 = Number(keyVal1);
            }
            else {
                if (keyVal2 === undefined) {
                    keyVal2 = key;
                }
                else {
                    keyVal2 += key;
                }
                keyVal2 = Number(keyVal2);
            }
            break;
        case "C":
            keyVal1 = 0;
            keyVal2 = undefined;
            operator = undefined;
            break;
        case "+/-":
            if (keyVal2 !== undefined) {
                keyVal2 *= -1;
            }
            else {
                keyVal1 *= -1;
            }
            break;
        case "%":
            break;
        default:
            if (operator !== undefined) {
                switch (operator) {
                    case "+":
                        result = keyVal1 + keyVal2;
                        break;
                    case "–":
                        result = keyVal1 - keyVal2;
                        break;
                    case "÷":
                        result = keyVal1 / keyVal2;
                        break;
                    case "×":
                        result = keyVal1 * keyVal2;
                        break;
                }
                operator = undefined;
                keyVal1 = result;
                keyVal2 = undefined;
            }
            operator = key;
            break;
    }
    if (keyVal2 === undefined) {
        $("#result").text(keyVal1);
    }
    else {
        $("#result").text(keyVal2);
    }
};
$("td").click(function () {
    constructCalculation(this.textContent);
});
$("*").keydown(function () {
    event.preventDefault();
    event.stopPropagation();
    var x = event.which || event.keyCode;
    console.log('x', x);
    switch (x) {
        case 13:
            constructCalculation('=');
            break;
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 106:
        case 107:
        case 109:
        case 111:
        case 187:
            constructCalculation(event.key);
            break;
        case 27:
        case 8:
            constructCalculation('C');
    }
});
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});