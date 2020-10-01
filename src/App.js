import React from "react";
import "./App.css";
import {
    format,
    scanWithDepthFirstSearch,
    isEmp,
    calculatePerimiter,
    getAreaFromFirstX,
} from "./utils";

function App() {
    const empThreshold = 11;
    const [visited] = scanWithDepthFirstSearch(empThreshold, Infinity);
    const [perimeter, firstPerimeterCoordinate] = calculatePerimiter(
        empThreshold
    );

    const graph = [];
    const num = firstPerimeterCoordinate + 1;
    for (let columnIndex = -num; columnIndex < num; columnIndex++) {
        const column = [];
        graph.push(column);
        for (let row = -num; row < num; row++) {
            column.push([columnIndex, row]);
        }
    }
    return (
        <div className="App">
            <div>emp threshold:{empThreshold}</div>
            <div>
                quick estimate of area:{" "}
                {getAreaFromFirstX(firstPerimeterCoordinate)}
            </div>
            <div>area using dfs: {Object.keys(visited).length}</div>
            <div className="graph">
                {graph.map((c, cI) => {
                    return (
                        <div key={cI} className="column">
                            {c.map((point, rI) => {
                                const nodeIsEmp = isEmp(point, empThreshold);
                                const isPerimeter = perimeter[format(point)];
                                const isVisited = visited[format(point)];

                                let backgroundColor = "black";
                                if (nodeIsEmp) {
                                    backgroundColor = "black";
                                }
                                if (isPerimeter && nodeIsEmp) {
                                    backgroundColor = "red";
                                }
                                if (isVisited) {
                                    backgroundColor = "green";
                                }

                                const diameter = "7px";
                                return (
                                    <div
                                        key={rI}
                                        style={{
                                            height: diameter,
                                            width: diameter,
                                            fontSize: "7px",
                                            overflow: "hidden",
                                            boxSizing: "border-box",
                                            border: "1px solid black",
                                            backgroundColor,
                                        }}
                                        data-test={format(point)}
                                    ></div>
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
