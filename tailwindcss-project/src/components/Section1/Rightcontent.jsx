import React from 'react'
import { ArrowUpRight } from 'lucide-react';
import Leftcontent from './Leftcontent';
const Rightcontent = (props) => {
  return (
            <div
              className='h-[100%] w-[30%] rounded-4xl px-10 py-8 flex flex-col justify-between bg-cover bg-center bg-no-repeat shrink-0'
              style={{
                backgroundImage: `url(${props.image})`
              }}
            >
                <p className='bg-gray-100 font-medium text-black text-xl rounded-full h-10 w-10 flex items-center justify-center'>{props.cardNumber}</p>
                <div className='text-gray-300 text-sm'>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis assumenda architecto eveniet hic est temporibus!</p>
                    <button className='bg-purple-400 px-5 py-2 rounded-3xl text-sm text-gray-100 mt-14'>Satisfied</button>
                </div>
            </div>
  )
}

export default Rightcontent
