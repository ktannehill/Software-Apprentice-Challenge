import React from 'react'

const Sort = ({ sortBy, onSort }) => {

    const handleSort = (e) => {
        onSort(e.target.value)
    }

  return (
    <div>
        <fieldset>
            <legend>Sort by Spend:</legend>
            <label htmlFor='spend-asc'>
                <input
                    type='radio'
                    id='spend-asc'
                    name='sort'
                    value='spend_asc'
                    checked={sortBy === 'spend_asc'}
                    onChange={handleSort}
                />
                Ascending
            </label>
            <label htmlFor='spend-desc'>
                <input 
                    type='radio'
                    id='spend-desc'
                    name='sort'
                    value='spend_desc'
                    checked={sortBy === 'spend_desc'}
                    onChange={handleSort}
                />
                Descending
            </label>
        </fieldset>
        <button onClick={() => onSort('')}>Clear</button>
    </div>
  )
}

export default Sort