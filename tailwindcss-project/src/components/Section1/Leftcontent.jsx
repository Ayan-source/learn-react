import React from 'react'
import { ArrowUpRight } from 'lucide-react';
const Leftcontent = () => {
  return (
      <div className="flex flex-col justify-between py-10">
                <div className='p-6'>
                <h2 className='text-5xl font-extrabold mb-6'>Prospective customer segmentation</h2>
                <p className='text-gray-400 font-bold w-[202px]'>Depending on customer satisfaction and access to banking product, potential target audience can be divided into three groups</p>
                </div>
                <ArrowUpRight size={100} />
        </div>
  )
}

export default Leftcontent
