// hooks
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useCounter, useProfile } from '../../feature/profile/hooks/useProfile'

const Profile = () => {
  const { query, isReady } = useRouter()
  const user_id = query.user_id
  const [count, countUP] = useCounter()
  const [profile, getProfile] = useProfile()

  return (
    <>
      <p>{user_id}</p>
      <p>{count}</p>
      <button onClick={() => countUP()}>カウントアップ</button>
      <p>{profile?.name}</p>
      <button onClick={() => getProfile("user-a")}>カウントアップ</button>
    </>
  )
}

export default Profile
