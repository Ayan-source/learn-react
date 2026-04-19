import React from 'react'
import Leftcontent from './Leftcontent';
import Rightcontent from './Rightcontent';


const Page1content = (props) => {
  return (
    <div className='grid grid-cols-[30%_auto] mt-5 h-[92%] pb-10 gap-16'>
        <Leftcontent></Leftcontent>
        <div className='flex gap-4 flex-nowrap overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
            {props.arr.map((elem,idx)=>(
                <Rightcontent key={idx} cardNumber={idx + 1} {...elem}></Rightcontent>
            ))}
        </div>
    </div>
  )
}

export default Page1content
