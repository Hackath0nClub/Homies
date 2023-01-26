// components
import { Test } from '../../feature/profile/components/Test'
import { UserName } from '../../feature/profile/components/UserName'

// hooks
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
// import { useProfile, Profile } from '../../feature/profile/hooks/useProfile'

const _profile = {
  id: 'user-a',
  name: 'UserA',
  text: 'test text',
  icon_url:
    'http://localhost:54321/storage/v1/object/public/profile/user-a.png',
  twitter_url: null,
  soundcloud_url: null,
  mixcloud_url: null,
  create_at: Date.now,
  updated_at: Date.now,
}

const Profile = () => {
  const { query, isReady } = useRouter()
  const user_id = query.user_id
  // const [count, countUP] = useCounter()
  // const [profile, getProfile] = useProfile()

  return (
    <>
<<<<<<< HEAD
      {/* <p>{count}</p>
      <button onClick={() => countUP()}>カウントアップ</button> */}
      {/* <p>{profile}</p> */}
      {/* <button onClick={() => getProfile(1)}>カウントアップ</button> */}

      {/* <Test></Test> */}

      <UserName id={_profile!.id} name={_profile!.name}></UserName>
      <UserIcon icon_url={_profile!.icon_url}></UserIcon>
      <ProfileText text={_profile!.text}></ProfileText>
=======
      <p>{user_id}</p>
      <p>{count}</p>
      <button onClick={() => countUP()}>カウントアップ</button>
      <p>{profile}</p>
      <button onClick={() => getProfile("user-a")}>カウントアップ</button>
>>>>>>> d44748a (user-aの情報を取るための下準備)
    </>
  )
}

export default Profile
