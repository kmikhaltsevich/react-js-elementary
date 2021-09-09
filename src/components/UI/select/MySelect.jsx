import React from 'react'
import classes from './MySelect.module.css'

const MySelect = ({options, defaultValue, value, onChange}) => {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={classes.mySelect}>
      <option disabled>{defaultValue}</option>
      {
        options.map(i => <option value={i.value} key={i.value}>{i.title}</option>)
      }
    </select>
  )
}

export default MySelect
