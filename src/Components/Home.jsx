import React, { useContext } from 'react'

import { counter } from '../Context/CounterContext';

export default function Home() {

  let {count, increase} = useContext(counter)


  return (
    <div>Home

      <h1 onClick={increase}>count: {count}</h1>
      
    </div>
  )
}
