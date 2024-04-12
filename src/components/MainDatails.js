import React from 'react'

const MainDatails = ({name,address}) => {
  return (
    <div>
      <section className="flex flex-col items-end justify-end">
        <h2 className="font-bold text-xl uppercase mb-1 md:text-4xl">{name}</h2>
        <p>{address}</p>
      </section>
    </div>
  )
}

export default MainDatails
