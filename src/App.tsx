import React from 'react'
import { useState } from 'react'
import './App.css'
import SubscriptionCalculator from './Components/Calculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SubscriptionCalculator />
    </>
  )
}

export default App
