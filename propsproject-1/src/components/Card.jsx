import React from 'react'

const Card = (props) => {
  return (
      <div className='card'>
        <img src={props.image} alt="" />
      <h1>{props.username}</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et fugit natus, non doloremque molestiae esse!</p>
      <button>View Profile</button>
    </div>
  )
}

export default Card
