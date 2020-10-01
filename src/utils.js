export const format = ([x, y]) => `${x},${y}`;

const generateOptions = ([x, y]) => [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y], // first to be popped
];

const markAsVisited = (coordinates, _visited, currentStep) =>
    (_visited[format(coordinates)] = currentStep || true);

export const isEmp = ([x, y], target) =>
    `${Math.abs(x)}${Math.abs(y)}`
        .split("")
        .reduce((a, b) => Number(a) + Number(b)) > target;

export function scanWithDepthFirstSearch(
    empThreshold,
    maxIterations = Infinity
) {
    const visited = {};
    const queue = [[0, 0]];
    let iterations = 0;
    while (queue.length > 0 && iterations < maxIterations) {
        iterations++;
        // depth first if 'pop'
        const current = queue.pop();
        if (!visited[format(current)]) {
            markAsVisited(current, visited, iterations);
            generateOptions(current).forEach((op) => {
                if (!visited[format(op)] && !isEmp(op, empThreshold)) {
                    queue.push(op);
                }
            });
        }
    }
    return [
        visited,
        // used for testing
        queue,
        iterations,
    ];
}

const findFirstCoordinate = (empThreshold, base = 10) => {
    const singleDigitMaxForBase = base - 1;
    let current;
    let firstCoordinate = "";
    for (
        current = empThreshold;
        current - singleDigitMaxForBase > 0;
        current -= singleDigitMaxForBase
    ) {
        firstCoordinate = firstCoordinate.concat(`${singleDigitMaxForBase}`);
    }
    firstCoordinate = `${current}${firstCoordinate}`;
    return Number(firstCoordinate);
};
export function calculatePerimiter(empThreshold) {
    const x = findFirstCoordinate(empThreshold + 1);
    let y = 0;
    const perimeter = {};
    for (let i = x; i >= 0; i--) {
        markAsVisited([-i, -y], perimeter, 1);
        markAsVisited([i, y], perimeter, 1);
        markAsVisited([-i, y], perimeter, 1);
        markAsVisited([i, -y], perimeter, 1);
        y++;
    }
    return [perimeter, x];
}

export const getAreaFromFirstX = (firstX) => Math.pow(firstX * 2, 2);
