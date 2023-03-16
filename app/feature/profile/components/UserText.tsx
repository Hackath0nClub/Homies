import {useEffect, useState } from 'react'

type PropsType = {
  text: string | null
  id: string
  setProfileText: (text: string | null, id: string) => Promise<void>
  isEdit: boolean
}

export const UserText = (props: PropsType) => {
  let [text, editText] = useState('')

  useEffect(() => {
    editText(text ?? '')
  })

  return (
    <>
      { props.isEdit ?
        <div>
          <input
              type="text"
              value={text ?? props.text}
              onChange={(e) => editText(e.target.value)}
            ></input>
          <button
            onClick={() => props.setProfileText(text ?? '', props.id)}
            className="bg-red-500"
          >
            更新
          </button>
        </div>
        :
        <div className='w-full'>
          <p className='text-white'>
            {props.text}
          </p>
        </div>
      }
    </>
  )
}