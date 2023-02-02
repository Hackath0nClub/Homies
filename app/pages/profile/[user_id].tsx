// components
import { UserName } from '../../feature/profile/components/UserName'
import { UserIcon } from '../../feature/profile/components/UserIcon'

// hooks
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useProfile } from '../../feature/profile/hooks/useProfile'

const ProfilePage = () => {
  const { query, isReady } = useRouter()
  const user_id = query.user_id
  const [profile, getProfile, setProfileText] = useProfile()

  useEffect(() => {
    if (typeof user_id != 'string') return
    getProfile(user_id)
  }, [isReady])

  return (
    <>
      {profile != undefined && (
        <>
          <UserName id={profile.id} name={profile.name}></UserName>
          <UserIcon icon_url={profile.icon_url}></UserIcon>
          <input type="text" defaultValue={profile.text ?? ''}></input>
          <button onClick={() => setProfileText(profile.text, profile.id)}>押す</button>
        </>
      )}

      {/* <ProfileText text={_profile!.text}></ProfileText> */}
    </>
  )
}

export default ProfilePage
