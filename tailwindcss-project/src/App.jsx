import React from 'react'
import { CornerDownRight } from 'lucide-react';
import Section1 from './components/Section1/Section1';

const App = () => {
  const arr = [
    {
        image: "https://images.unsplash.com/photo-1638920349682-72016cff59aa?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        image: "https://images.unsplash.com/photo-1643891499981-86ab5ccb4b94?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        image: "https://plus.unsplash.com/premium_photo-1731680780948-249419f8cd50?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        image: "https://images.unsplash.com/photo-1759661031065-a6e91f619f47?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        image: "https://images.unsplash.com/photo-1759661031065-a6e91f619f47?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        image: "https://images.unsplash.com/photo-1759661031065-a6e91f619f47?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]
  return (
    <div>
      <Section1 arr={arr}></Section1>
    </div>
  )
}

export default App
