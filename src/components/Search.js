import React from 'react'

const Search = ({ searchTerm, onSearch }) => {
  return (
    <div>
        <label htmlFor='search' className='flex'> Search: 
            <input
                type='text'
                id='search'
                placeholder='Enter campaign name'
                value={searchTerm}
                onChange={onSearch}
            />
        </label>
    </div>
  )
}

export default Search