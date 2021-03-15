import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  const spread = () => ({ type, value, onChange })

  return {
    type,
    value,
    onChange,
    reset,
    spread
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}