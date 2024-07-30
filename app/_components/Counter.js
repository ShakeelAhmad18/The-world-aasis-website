  "use client"

import React, { useState } from 'react'

export default function Counter({data}) {

    const [counter,setCounter]=useState(0)

  return (
    <div>
        there are {data.length} users
      <button value={counter} onClick={()=>setCounter((e)=>e + 1)}>{counter}</button>
    </div>
  )
}
