import React from "react";
import "./App.css";

function App() {
    const columns = 100;
    const rows = 100;
    return (
        <div className="App">
            <h2>Graph</h2>
            <div className="graph">
                {new Array(columns).fill(null).map((c, cI) => {
                    return (
                        <div key={cI} className="column">
                            {new Array(rows).fill(null).map((r, rI) => {
                                const newCI = cI - 50;
                                const newRI = rI - 50;

                                const sum = `${Math.abs(newCI)}${Math.abs(
                                    newRI
                                )}`
                                    .split("")
                                    .map(Number)
                                    .map(Math.abs)
                                    .reduce((a, b) => a + b);
                                const isEmp = sum === 10;

                                return (
                                    <div
                                        key={rI}
                                        className={`square ${
                                            isEmp ? "emp" : ""
                                        }`}
                                    >
                                        {cI},{rI}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
