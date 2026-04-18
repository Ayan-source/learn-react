import React from 'react'
import {Bookmark} from 'lucide-react'
const Card = (props) => {
  return (
    <div className='box'>
      <div className="upper">
        <img src={props.image} alt="" />
        <button>Save <Bookmark size={12} strokeWidth={1.25} /></button>
      </div>
      <div className="center">
        <h3>{props.name} <span>5 days ago</span></h3>
        <h2>{props.job}</h2>
        <div>
            <h4>{props.tag1}</h4>
            <h4>{props.tag2}</h4>
        </div>

      </div>
      <div className="bottom">
        <div>
            <h3>{props.pay}</h3>
            <p>{props.location}</p>
        </div>
        <button>Apply Now</button>
      </div>
    </div>
  )
}

export default Card
