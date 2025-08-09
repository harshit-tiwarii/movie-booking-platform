import React, { useState } from 'react'
import MovieCard from '../component/MovieCard'
import { movieData } from '../assets/QuickShow-assets/assets'

const Movies = () => {
  const [visibledata, setvisibleData] = useState(8)
  const showMoreData = () => {
    setvisibleData(prev => prev + 4)
  }
  return (
    <div className='mt-30'>
      <h2 className='text-white mb-10 ml-18 text-2xl'>Now showing movies</h2>
      <div className="flex flex-wrap gap-7 justify-center ">
        {movieData.slice(0, visibledata).map((movie, idx) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            idx={idx}
          />
        ))}
      </div>
      <div className="flex justify-end mt-8 px-[10%]">
        <button onClick={showMoreData} className="rounded-full px-7 cursor-pointer py-3 font-semibold text-white bg-gradient-to-r from-[#1e3a8a] via-[#4f46e5] to-[#7c3aed] shadow-md hover:from-[#7c3aed] hover:to-[#1e3a8a] transition-all duration-200 whitespace-nowrap">
          Show More
        </button>
      </div>
    </div>
  )
}

export default Movies