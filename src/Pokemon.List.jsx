import React from 'react'

export default function PokemonList({ Pokemon }) {
  return (
    <div>
        {Pokemon.map(p => (
            <div key={p}>{p}</div>
        ))}

    </div>
  )
}

