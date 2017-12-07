## AI

With most game AI, gameplay will revolve around player movement and interaction. Zion provides a fairly robust AI system, including steering behaviors, A* path-finding, and path-following. All player-centered functionality is provided by the `AI` class:

```js
let params = {
    velocity: {0,0},
    accleration: {0,0},
    maxForce: 0.1,
    maxSpeed: 2,
    maxAcceleration: 3,
    timeToTarget: 0.8
};
let character = new AI(src, size, position, params);
```

For movement, `AI` provides the following extendable behaviors:
- `seek(target)` : seek the given target's position.
- `flee(target)` : flee from the given target's position.
- `arrive(target)` : stop at the given target's position. The AI will slow and approach the target based on the initialized **Radius of Satisfaction (ROS)** and **Radius of Deceleration (ROD)**
- `follow(path, target)` : follow the given path to reach the intended target.

For more information, you may check out an overview of each behavior's description [here](https://gamedevelopment.tutsplus.com/series/understanding-steering-behaviors--gamedev-12732)

`AStar` complements `AI` by providing path-finding for any given weighted graph. The default hueristic utilizes Manhattan distance to find the optimal path for character movement:

```js
let aStar = new AStar();
let graph = [{x: 0, y: 0}, {x: 1, y: 1}, {x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 2}];
let shortestPath = AStar.AStarPathFind(graph, graph[0], graph[3]);
```

Zion also provides a lightweight Decision Tree system for managing character states. Each decision tree is based on a system of `DecisionNodes` that constitute one of two action types: `CheckMethod` and `ActionMethod`. `CheckMethod` nodes determine the next node to traverse. These include any type of inquiries about a character's state or relationship to the game environment. `ActionMethod` nodes are the result of a single or sequence of `CheckMethod` nodes. These nodes change a character's state. A Decision Tree can be built as follows:

```js
function defineChecks() {
  let checkDistance = (character) => { ... }; // check character's distance to some game object
  let checkState = (character) => { ... }; // check the AI's state
  return { checkDistance, checkState };
}

function defineActions() {
  let nextState = (player, currState) { ... }; // transition character states
  let changeAppearance(state) { ... }; // change the character's appearance based on their current state
  return { nextStatet, changeAppearance };
}
// Store new checks and actions
let checks = defineChecks;
let actions = defineActions;
// Establish tree nodes...
let root = new DecisionNode(checks.checkDistance);
let leftChild = new DecisionNode(checks.checkState);
let leftAction = new DecisionNode(actions.nextState);
let rightChild = new DecisionNode(actions.changeAppearance);
// ...and parent them
leftChild.setTrueNode(leftAction);
root.setTrueNode(leftAction);
root.setFalseNode(rightChild);
```

To execute the tree, call `makeDecision()` for the appropriate character. This should generally be done in  `update()` as you will want to alter player states before rendering:

```js
update() {
  // Run our decision tree
  root.makeDecision();
}
```