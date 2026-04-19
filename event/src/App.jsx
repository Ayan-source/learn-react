import React from 'react'


const App = () => {
  function handler(){
  a = "Ahmed"
  alert("changed")
}
let a = "Ayan"
const haha = (e)=>{
  console.log(e.target.value)
}
  return (
    <div>
      <h1>Hello world {a}</h1>
      <button onClick={handler}>Clickme</button>
      <button onClick={()=>{
        console.log("hi")
      }}>Clickme2</button>

      <input onChange={haha} type="text" placeholder='enter your name' />
    </div>
  )
}

export default App

// more Events
// onclick
// onmouseenter
// onscroll
// onchange
// onwheel