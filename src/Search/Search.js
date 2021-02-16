import React, {useState} from 'react';

const Search = (props) => {
  const [value, setValue] = useState('')
  const valueChangeHandler = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <input
        type="text"
        onChange={valueChangeHandler}
        value={value}
      />
      <button onClick={() => props.onSearch(value)} >Search</button>
    </div>
  )
}

export default Search;