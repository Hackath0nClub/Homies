import React from 'react'
import { atom, useRecoilState } from 'recoil'

export const statusState = atom<string>({
  key: 'statusState',
  default: '',
})

export const useStatus = () => {
  const [status, set] = useRecoilState(statusState)

  const setStatus = React.useCallback(
    (value: string) => {
      set(value)
    },
    [set]
  )

  return { status, setStatus }
}
