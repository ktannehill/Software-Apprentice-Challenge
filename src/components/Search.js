import React from 'react'

const Search = ({ searchTerm, onSearch }) => {
  return (
    <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={onSearch}
    />
  )
}

export default Search