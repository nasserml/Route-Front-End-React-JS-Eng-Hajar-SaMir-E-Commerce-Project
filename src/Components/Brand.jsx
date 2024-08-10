import React, { useContext } from 'react'
import { counter } from './../Context/CounterContext';

export default function Brand() {
  let {count, increase} = useContext(counter);
  return (
    <div>Brand
      <h1 onClick={increase}>counter : {count}</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae reprehenderit sunt laboriosam cum velit commodi et consequuntur qui dolore similique? Incidunt dolorum culpa est in! Eius molestiae suscipit aliquam maxime.</p>
    </div>
  )
}
