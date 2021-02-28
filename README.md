# Full Stack Open 2020

- **[Part 3 Phonebook](https://salty-forest-19169.herokuapp.com/) on Heroku**

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

## 3. Programming a server with NodeJS and Express
- `const http = require('http')` Node uses CommonJS modules not ES6 modules.
- `npm install express` install express
- Express example route with params
```javascript
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
```
- `response.json(notes)` Express JSON response
- `npm install --save-dev nodemon` nodemon used for automatic restarts on source changes.
- `HTTP 204` response used for successfull resource deletion
- `app.use(express.json())` include Express JSON parser
- `app.use(cors())` cors is required for the browser security model to work when the frontend is at a different address to the backend.
- `const PORT = process.env.PORT || 3001` heroku gives it's port as an environment variable
- `app.use(express.static('build'))` static files on express
- `"build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/"` package.json build script
- `"deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy"` heroku deploy script
- `require('dotenv').config()` makes environment variables from `.env` available, eg. `process.env.MONGODB_URI`
- `const errorHandler = (error, request, response, next) => ...` Express error handlers are middleware that are defined with a function that accepts four parameters. They are invoked when `next` is called with a parameter eg. `next(error)`
- `heroku config:set MONGODB_URI=mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true` setting heroku environment variables
- `npm install mongoose-unique-validator` required for unique validations with mongoose
- `npm install eslint --save-dev` eslint for linting
- `node_modules/.bin/eslint --init` initialize lint config
- `.eslintignore` used like .gitignore for eslint