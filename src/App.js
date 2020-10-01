import React from "react";
import "./App.css";
import {
    format,
    scanWithDepthFirstSearch,
    isEmp,
    calculatePerimiter,
} from "./findParimter";
function App() {
    const graph = [];
    const num = 80;
    for (let columnIndex = -num; columnIndex < num; columnIndex++) {
        const column = [];
        graph.push(column);
        for (let row = -num; row < num; row++) {
            column.push([columnIndex, row]);
        }
    }

    const empThreshold = 10;
    const [visited, queue, iterations] = scanWithDepthFirstSearch(
        empThreshold,
        9000
    );
    const [perimeter, firstPerimeterCoordinate] = calculatePerimiter(
        empThreshold
    );

    return (
        <div className="App">
            <div>
                quick estimate of area:{" "}
                {firstPerimeterCoordinate * firstPerimeterCoordinate}{" "}
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

                                const diameter = "10px";
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
