import React from 'react'

const Search = ({ searchTerm, onSearch }) => {
  return (
    <label htmlFor='search'> Search: 
        <input
            type='text'
            placeholder='Enter campaign name'
            value={searchTerm}
            onChange={onSearch}
        />
    </label>
  )
}

export default Search