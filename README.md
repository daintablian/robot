This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

# Answer

Using a quick DFS scan (could have been BFS) I was able to get an anwer of `592597`. This seems close.

For a quick estimate of the area given my algorithm `calculatePerimeter`, I got `1954404`. This is way off, as many points on the grid are EMP's. My estimate is that just under have of the points in the perimeter are EMP's, but I didn't get enough time to figure out that mathematical pattern there.

For rendering I should have used canvas, as the browser was chugging.
