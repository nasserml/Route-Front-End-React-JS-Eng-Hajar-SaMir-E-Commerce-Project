import React from 'react'
import error from '../assets/finalProject assets/error.svg'

export default function NotFound() {
  return (
    <div className='text-center my-4'>
      <h2>Not Found</h2>
      <img className='m-auto' src={error} alt="" />
    </div>
  )
}
