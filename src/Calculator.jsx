import './Calculator.css'; // css file
import { useState } from 'react';
import { evaluate } from 'mathjs'; // download `npm install mathjs`

import { FaBackspace } from "react-icons/fa"; // download `npm install react-icons`

function Calculator() {
    const [value, setValue] = useState(""); // entered value

    // clears input
    const HandleClear = () => {
        setValue("");
    };

    // removes value from end
    const HandleUndo = () => {
        setValue(prev => (prev.length > 0 ? prev.slice(0, -1) : prev));
    };

    // handles conversions
    const HandleConversion = (symbol, number) => {
        // checks if symbol is equal to string and number isn't undefined
        if (typeof symbol === "string" && number !== undefined) {
            // if symbol is "%", it will perform the conversion
            if (symbol.trim() === "%") {
                setValue(evaluate(number / 100));
            }
        };
    };

    // adds a symbol
    const AddSymbol = (symbol) => {
        setValue(prev => prev + symbol);
    };

    // adds a number
    const AddNumber = (number) => {
        setValue(prev => prev + number);
    };

    // performs calculation
    const Calculate = () => {
        try {
            const result = evaluate(value);
            setValue(result.toString()); // converts to string
        } catch {
            setValue("Error"); // catches the error if occurred
        };
    };

    // checks if last character entered is a symbol
    const isLastCharSymbol = /[+\-*/.%]/.test(value.slice(-1)); // regex

    return (
        <div className="container">
            <div className="calculator-container">
                <div className="input-field-container">
                    <div className="result">{value || "0"}</div>
                </div>

                <div className="buttons-container">
                    {/* clear symbol */}
                    <button className="clear" onClick={HandleClear}>C</button>
                    {/* division */}
                    <button className="divide-sign" onClick={() => {AddSymbol("/")}} disabled={isLastCharSymbol}>/</button>
                    {/* multiplication */}
                    <button className="times-sign" onClick={() => {AddSymbol("*")}} disabled={isLastCharSymbol}>*</button>
                    {/* redo */}
                    <button className="redo-sign" onClick={HandleUndo}><FaBackspace /></button>
                    {/* 7-9 */}
                    <button className="seven" onClick={() => AddNumber("7")}>7</button>
                    <button className="eight" onClick={() => AddNumber("8")}>8</button>
                    <button className="nine" onClick={() => AddNumber("9")}>9</button>

                    {/* subtraction */}
                    <button className="minus-sign" onClick={() => {AddSymbol("-")}} disabled={isLastCharSymbol}>-</button>
                    {/* 4-6 */}
                    <button className="four" onClick={() => AddNumber("4")}>4</button>
                    <button className="five" onClick={() => AddNumber("5")}>5</button>
                    <button className="six" onClick={() => AddNumber("6")}>6</button>

                    {/* addition */}
                    <button className="plus-sign" onClick={() => {AddSymbol("+")}} disabled={isLastCharSymbol}>+</button>
                    {/* 1-3 */}
                    <button className="one" onClick={() => AddNumber("1")}>1</button>
                    <button className="two" onClick={() => AddNumber("2")}>2</button>
                    <button className="three" onClick={() => AddNumber("3")}>3</button>

                    {/* equal */}
                    <button className="equal-sign" onClick={(symbol) => Calculate(symbol, value)}>=</button>
                    {/* 0 */}
                    <button className="zero" onClick={() => AddNumber("0")}>0</button>
                    {/* decimal */}
                    <button className="decimal" onClick={() => {AddSymbol(".")}} disabled={isLastCharSymbol}>.</button>

                    {/* percent */}
                    <button className="percent-sign" onClick={() => {AddSymbol("%"); HandleConversion(); }} disabled={isLastCharSymbol}>%</button>
                </div>
                {/* msg */}
                <p className="msg">
                    Online Calculator
                </p>
            </div>
        </div>
    );
}

export default Calculator