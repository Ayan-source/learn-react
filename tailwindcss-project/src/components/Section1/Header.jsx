import React from 'react'
import { CornerDownRight } from 'lucide-react';
const Header = () => {
  return (
    <div>
      <div className="header flex justify-between items-center">
        <h2 className='bg-black text-white py-2 px-6 rounded-full text-sm font-extralight'>TARGET AUDIENCE</h2>
        <h2 className='flex gap-2 items-center [word-spacing:3px] font-medium text-sm bg-gray-200 py-2 px-6 rounded-full'><CornerDownRight size={16} strokeWidth={2.5} />DIGITAL BANKING PLATFORM</h2>
      </div>
    </div>
  )
}

export default Header
