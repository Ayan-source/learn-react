import React, { useState } from 'react'
const App = () => {
  const [count, setCount] = useState(0)
  const [username, setUser] = useState("Ayan")
  const [user, setArr] = useState([10,20,30])
  const [oldobj,setOld] = useState({user:"Ayan",age:21})
  const [Title,setTitle] = useState("")
  return (
    <div>
      <p>This is a var: {count}</p>
      <p>This is a string: {username}</p>
      <p>This is a array: {user}</p>
      <p>This is a object: {oldobj.user}, {oldobj.age}</p>
      <button onClick={
        ()=>{
          setCount(count+1)
          setUser("Ahmed")
          // setArr([user,count])
          // const temp = [...user]
          // temp.push(count)
          // setArr(temp)
          setArr((prev)=>[...prev,count])
          // const newnum = {...oldobj}
          // newnum.user = "Ahmed"
          // newnum.age = 43
          // setOld(newnum)
          setOld((prev) => ({ ...prev, user:"Aram" }))
        }
      }>Clickme</button>

      <form onSubmit={(e)=>{
        e.preventDefault()
        console.log("form submited by",Title)
        setTitle('')
      }}>
        <input type="text" name="" id="" placeholder='enter your name' value={Title} onChange={(e)=>{
          setTitle(e.target.value)
        }}/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App
