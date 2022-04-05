// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    // map into new children and pass the props
    // cant modify child directly so need to clone

    // for div or non-react elements, don't clone
    // if (typeof child.type === 'string') {
    //   return child
    // }

    if (allowedTypes.includes(child.type)) {
      const newChild = React.cloneElement(child, {on, toggle}) 
      return newChild  
    }
    return child
  })
}

const ToggleOn = ({on, children}) => on ? children : null

const ToggleOff = ({on, children}) => on ? null : children

const ToggleButton = ({on, toggle}) => {
  return <Switch on={on} onClick={toggle} />
}

// list of react components that are allowed to be cloned and add props
const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>Hello!</div>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App
