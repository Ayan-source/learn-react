import React from 'react'
import Nav from './components/nav'
import Card from './components/card'

let a = 10
const App = () => {
  return (
    <div>
      <Nav></Nav>
      <Card></Card>
      <h1>Hello {a} dafa</h1>
    </div>
  )
}

export default App
