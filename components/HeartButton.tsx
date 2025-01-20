"use client"

import { Heart } from 'lucide-react';
import React, { useState } from 'react'

export default function HeartButton() {
    const [liked, setLiked] = useState(false);
  return (
      <>
        <button onClick={() => setLiked(!liked)}>
              <Heart fill={`${ liked ? 'red' : 'white'}`}/>
        </button>
      </>
  )
}
