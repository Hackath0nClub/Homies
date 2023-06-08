import { useState } from 'react'
import { useProfile } from '../../hooks/useProfile'

export const UserText = () => {
  const { profileBase, isEditText, setProfileText } = useProfile()
  let [text, editText] = useState('')

  return (
    <>
      { isEditText ?
        <div>
          <input
              type="text"
              defaultValue={String(profileBase.text)}
              onChange={(e) => editText(e.target.value)}
            ></input>
          <button
            onClick={() => setProfileText(text ?? '', String(profileBase.id))}
            className="bg-red-500"
          >
            更新
          </button>
        </div>
        :
        <div className='w-full'>
          <p className='text-white'>
            {profileBase.text}
          </p>
        </div>
      }
    </>
  )
}