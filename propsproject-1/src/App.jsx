import React from 'react'
import Card from './components/Card'

const arr = [
  {
    username:"Ayan hussain",
    img: "https://images.unsplash.com/photo-1758916704096-8a10bab25440?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
  },
  {
    username:"Ahmed anwer",
    img: "https://images.unsplash.com/photo-1525007861926-88da2347a975?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"
  },
  {
    username:"Taha",
    img: "https://images.unsplash.com/photo-1749282005049-bb57b442109a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D"
  },
  {
    username:"Rahim",
    img: "https://images.unsplash.com/photo-1750072203032-526865127722?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
  },
  {
    username:"John doe",
    img: "https://images.unsplash.com/photo-1592701949322-e62aa9228729?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8"
  }
]

// arr.map((elem,index)=>{
//   console.log(index,elem)
// })
const App = () => {
  return (
    <div className='parent'>
      {arr.map((elem,index)=>(
        <Card username={elem.username} image={elem.img}></Card>
      ))}
    </div>
  )
}

export default App
