// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
// allows you to pass access props inside other components via useToggle
const ToggleContext = React.createContext()
// add name for the dev tools
ToggleContext.displayName = "Toggle Context"

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
// returns the props in value defined above
function useToggle() {
  const context = React.useContext(ToggleContext)
  
  if (!context) {
    throw new Error("useToggle must be used within a <Toggle />")
  }

  return context
}

function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

function ToggleButton(props) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

// Use to show what happens if you don't render ToggleButton inside a Toggle
// const App = () => <ToggleButton />
function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App
