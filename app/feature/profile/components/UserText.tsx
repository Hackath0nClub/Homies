import {useEffect, useState } from 'react'

type PropsType = {
  text: string | null
  id: string
  setProfileText: (text: string | null, id: string) => Promise<void>
}

export const UserText = (props: PropsType) => {
  let [text, editText] = useState('')

  useEffect(() => {
    editText(text ?? '')
  })


  return (
    <>
      <div className='w-auto'>
        <input
          type="text"
          value={text ?? ''}
          onChange={(e) => editText(e.target.value)}
        ></input>
        <p className='text-white'>
          {props.text}
        </p>
      </div>
      <button
        onClick={() => props.setProfileText(text ?? '', props.id)}
      >
        押す
      </button>
    </>
  )
}