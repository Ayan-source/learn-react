import React, { useState } from 'react'

const App = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [notes, setNotes] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() && !details.trim()) return

    setNotes((prevNotes) => [...prevNotes, { title, details }])
    setTitle('')
    setDetails('')
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDetailsChange = (e) => {
    setDetails(e.target.value)
  }

  const handleDelete = (noteIndex) => {
    setNotes((prevNotes) => prevNotes.filter((_, idx) => idx !== noteIndex))
  }

  return (
    <div className='h-screen w-full bg-black text-white'>
      <form className='p-10 flex gap-10 h-full' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 w-1/2'>
          <input
            type='text'
            placeholder='Enter Notes Heading'
            className='border-2 outline-none px-10 py-5 rounded-xl'
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder='Write Details'
            className='border-2 outline-none px-10 h-32 py-4 rounded-xl w-full'
            value={details}
            onChange={handleDetailsChange}
          />
          <button className='px-10 py-5 rounded-xl bg-white text-black w-full cursor-pointer active:scale-95 font-medium'>
            Add Notes
          </button>
        </div>
        <div className='w-1/2 flex gap-5 flex-wrap border-l-2 px-5'>
          {notes.map((note, idx) => (
            <div key={idx} className='text-black bg-white w-50 h-50 rounded-xl py-2 px-4 flex flex-col justify-between'>
              <div>
                <h1 className='font-bold uppercase text-2xl mb-1'>{note.title}</h1>
                <p className='font-medium text-gray-700'>{note.details}</p>
              </div>
              <div className='flex justify-center'>
                <button
                  type='button'
                  className='bg-red-500 text-sm font-medium active:scale-75 cursor-pointer p-3 rounded-xl'
                  onClick={() => handleDelete(idx)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
          </div>
      </form>
    </div>
  )
}

export default App
