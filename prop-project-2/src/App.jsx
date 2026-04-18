import React from 'react'
import Card from './components/Card'

const jobs = [
  {
    image: "https://logo.clearbit.com/google.com",
    name: "Google",
    job: "Product Designer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$100/hr",
    location: "Pakistan, Karachi"
  },
  {
    image: "https://logo.clearbit.com/microsoft.com",
    name: "Microsoft",
    job: "UX Researcher",
    tag1: "Part Time",
    tag2: "Senior Level",
    pay: "$110/hr",
    location: "Pakistan, Lahore"
  },
  {
    image: "https://logo.clearbit.com/netflix.com",
    name: "Netflix",
    job: "UI Designer",
    tag1: "Remote",
    tag2: "Mid Level",
    pay: "$95/hr",
    location: "Remote"
  },
  {
    image: "https://logo.clearbit.com/spotify.com",
    name: "Spotify",
    job: "Product Designer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$70/hr",
    location: "Pakistan, Islamabad"
  },
  {
    image: "https://logo.clearbit.com/airbnb.com",
    name: "Airbnb",
    job: "UX Designer",
    tag1: "Contract",
    tag2: "Senior Level",
    pay: "$120/hr",
    location: "Remote"
  },
  {
    image: "https://logo.clearbit.com/facebook.com",
    name: "Meta",
    job: "Interaction Designer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$105/hr",
    location: "Pakistan, Karachi"
  },
  {
    image: "https://logo.clearbit.com/tesla.com",
    name: "Tesla",
    job: "UI Engineer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$130/hr",
    location: "USA, Remote"
  },
  {
    image: "https://logo.clearbit.com/adobe.com",
    name: "Adobe",
    job: "Visual Designer",
    tag1: "Part Time",
    tag2: "Mid Level",
    pay: "$90/hr",
    location: "Pakistan, Lahore"
  },
  {
    image: "https://logo.clearbit.com/apple.com",
    name: "Apple",
    job: "UX Architect",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$140/hr",
    location: "USA, Remote"
  },
  {
    image: "https://logo.clearbit.com/shopify.com",
    name: "Shopify",
    job: "Product Designer",
    tag1: "Remote",
    tag2: "Mid Level",
    pay: "$98/hr",
    location: "Remote"
  }
];
const App = () => {
  return (
    <div className='parent'>
      {/* {jobs.map((elem,index)=>(
        <Card 
        image = {elem.image}
        name = {elem.name}
        job = {elem.job}
        tag1 = {elem.tag1}
        tag2 = {elem.tag2}
        pay = {elem.pay}
        location = {elem.location}
        ></Card>
      ))} */}
      {jobs.map((elem,index)=>(
        <Card {...elem}></Card>
      ))}
    </div>
  )
}

export default App
