import React from 'react'
import Header from './Header'
import Page1content from './Page1content'

const Section1 = (props) => {
  return (
    <div className='bg-[whitesmoke] h-screen w-full py-5 px-20'>
        <Header></Header>
        <Page1content arr={props.arr}></Page1content>
    </div>
  )
}

export default Section1
