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
    return React.cloneElement(child, {on, toggle})    
  })
}

const ToggleOn = ({on, children}) => on ? children : null

const ToggleOff = ({on, children}) => on ? null : children

const ToggleButton = ({on, toggle}) => {
  return <Switch on={on} onClick={toggle} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App
