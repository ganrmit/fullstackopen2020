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

## 2. Communicating with server
- `console.log('props value is', props)` when logging pass values as seperate arguments instead of concatenating. This avoids `props value is [Object object]`.
- React requires a key for list items so it knows what to update:
```jsx
{notes.map(note =>
  <li key={note.id}>
    {note.content}
  </li>
)}
```
- `export default Note` default module export for a file.
- `import Note from './components/Note'` importing the module in another file
- `event => event.preventDefault()` prevent a default action, eg. form submit
- `<form onSubmit={addNote}>` give a form a submission event
- `event.target` and `event.target.value` useful for grabbing info about event triggerer
- `<input value={newNote} onChange={handleNoteChange} />` set a change handler on an input
- `new Date().toISOString()` current date as ISO string
- Form submit event snippet
```jsx
const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date().toISOString(),
    important: Math.random() < 0.5,
    id: notes.length + 1,
  }

  setNotes(notes.concat(noteObject))
  setNewNote('')
}
```
- Input element and event snippet
```jsx
const handleNoteChange = (event) => setNewNote(event.target.value)
<input value={newNote} onChange={handleNoteChange} />
```
- `` `${newName} is already added to phonebook` `` javascript string templates
- `"server": "json-server -p3001 --watch db.json"` adding a new npm script to package.json
- Example of a React one off effect with axios to load data
```javascript
useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}, [])
```
- In react we have to use `className` for CSS classes as `class` is a restricted keywork in JS.
- Hyphenated (kebab case) CSS properties are written in camelCase.
- Styling can be done inline in react:
```jsx
const footerStyle = { color: 'green', fontStyle: 'italic', fontSize: 16 }
<div style={footerStyle}>...
```