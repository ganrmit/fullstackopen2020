# Full Stack Open 2020

My solutions to the [Full Stack Open](https://fullstackopen.com/en/) course at the University of Helsinki. Accompanied by notes for things I found surprising or useful to remember.

## 1. Introduction to React
- [NVM](https://github.com/nvm-sh/nvm) Node version Manager, useful for getting specific versions of node and npm.
- `npx create-react-app part1` create an app
- `<p>Hello world, it is {now.toString()}</p>` JSX interpolation done with curly braces
- `<br />` JSX requires tag closing unlike HTML5
- `<Hello name="George" />` passing a prop called name.
- React component names must be capitalized.
- [Fragments](https://reactjs.org/docs/fragments.html#short-syntax) avoid div-itis.
- [Web Sequence Diagrams](https://www.websequencediagrams.com/) Great sequence diagram tool.
- `newArray = array.concat(5)` Use functional methods like concat on collections.
- `const [first, second, ...rest] = t` destructuring assignment
- `const Hello = ({ name, age }) => {...}` destructuring can be used in function definitions
- Course encourages the use of "this-less" JavaScript.
- `const [ counter, setCounter ] = useState(0)` useState function use to make a counter
- `const Display = ({ counter }) => <div>{counter}</div>` if a component contains only a return statement it can be simplified to immediately return the element.
- `{ ...clicks, right: clicks.right + 1 }` Object spread syntax useful for creating new objects with a single change
- It is forbidden in React to mutate state directly, since it can result in unexpected side effects.
- Do Not Define Components Within Components! React treats a component defined inside of another component as a new component in every render.