# Full Stack Open 2020

- **[Part 3 Phonebook](https://salty-forest-19169.herokuapp.com/) on Heroku**

My solutions to the [Full Stack Open](https://fullstackopen.com/en/) course at the University of Helsinki. Accompanied by notes for things I found surprising or useful to remember. This is not always the cleanest code and was made for my own learning. **Projects are labelled after the chapter they were started (not when finished)**

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

## 4. Testing Express servers, user administration
- Project structure
```
├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
```
- `npm install --save-dev jest` Jest used for testing
- `npm install express-async-errors` If an exception occurs in a async route, the execution is automatically passed to the error handling middleware without the need for a try/catch.
- `await Promise.all(promiseArray)` await an array of promises.
- `for...of` will handle promises serially
```javascript
for (let note of helper.initialNotes) {
  let noteObject = new Note(note)
  await noteObject.save()
}
```
- `User.find({}).populate('notes')` you can populate references in mongoose.
- `User.find({}).populate('notes', { content: 1, date: 1 })` mongoose population allows you to specify what to populate. This is like a weak GraphQL
- `npm install jsonwebtoken` library for generating web tokens.
- `bcrypt.compare(body.password, user.passwordHash)` bcrypt.compare for password/hash comparisons.
- `jwt.sign(userForToken, process.env.SECRET)` signing a web token.
- `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW` auth header of this form for JWTs.

## 5. Testing React apps
- `{user === null && loginForm()}` conditional rendering trick for react
- `{user === null ? loginForm() : noteForm() }` a more explicit, more terse conditional rendering trick.
- `window.localStorage.setItem('name', 'juha tauriainen')` local storage setting
- `window.localStorage.getItem('name')` local storage getting
- `window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))` local storage stores DOMstrings so objects must be stringified.
- `props.children` allows access and control of child elements
```jsx
<Togglable buttonLabel="reveal">
  <p>this line is at start hidden</p>
  <p>also this is hidden</p>
</Togglable>
// Can be used for conditional display and control
<div style={showWhenVisible}>
  {props.children}
  <button onClick={toggleVisibility}>cancel</button>
</div>
```
- `npm install prop-types` The expected and required props of a component can be defined with the prop-types package.
- `Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired }` making an element have required props.
- `npm install --save-dev eslint-plugin-jest` there's a plugin to prevent eslint jest errors.
- `npm install --save-dev @testing-library/react @testing-library/jest-dom` react testing library used for testing components and it extends jest.
- `component.debug()` allows printing a component's html to the console.
- `CI=true npm test -- --coverage` code coverage can be viewed
- `npm install --save-dev cypress` cypress is used for end to end testing
- `npm install eslint-plugin-cypress --save-dev` cypress requires a plugin (and configuration) for eslint not to complain about globals.

## 6. State management with Redux
- `npm install redux` use redux for state control
- `{ type: 'INCREMENT' }` actions in redux are just objects with a type field (and possibly more).
- Reducers transform current state to a new state using an action.
- `counterReducer = (state = 0, action) => {...` put defaults on reducers so they can work when the state is empty
- `npm install --save-dev deep-freeze` deep-freeze ensures reducers are pure functions and don't produce side effects. Only used in dev as it hurts performance.
- `[first, second, ...rest] = numbers` array destructuring used.
- `npm install react-redux` react-redux used for hooking store into react hooks
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) and [redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension) allow you to inspect the store state.
- `npm install redux-thunk` async redux action middleware

## 7. React router, custom hooks, styling app with CSS and webpack
- `npm install react-router-dom` react router used for routing that just works with HTML5 history API.
- `BrowserRouter as Router` you can rename on import.
- The name of custom hooks must start with the word `use` eg. `useState()`.
- `<input {...name} /> ` spreading attributes can be used in jsx.
- [Awesome React Hooks Resources](https://github.com/rehooks/awesome-react-hooks)
- `npm install react-bootstrap` bootstrap styling in react
- `npm install @material-ui/core` material-ui styling in react
- `npm install styled-components` shorthand component styling with template literals
- `npm install --save-dev webpack webpack-cli` webpack tools
- Webpack works by tracing from the entrypoint.js to any javascript it imports and in turn any javascript they import. This must mean dynamic `requires('/path/'+variable)` won't work?
- Base webpack config
``` javascript
const path = require('path')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  }
}
module.exports = config
```
- Loaders give Webpack the ability to handle more than just plain javascript.
- Babel-loader with react
```javascript
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
}
```
- `npm install @babel/core babel-loader @babel/preset-react --save-dev` babel-loader dependencies
- `npm install @babel/polyfill` polyfill for things like async on old browsers
- `const config = (env, argv) => {...}` webpack config can be a function to have different environments.
- `npm outdated --depth 0` check for outdated modules
- `npm audit` check for actual security vulnerabilities and `npm audit fix` to fix patch them
- [React Patterns](https://reactpatterns.com/) Provides a concise list of react best practice patterns.
