// components
import { UserName } from '../../feature/profile/components/UserName'
import { UserIcon } from '../../feature/profile/components/UserIcon'

// hooks
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useProfile } from '../../feature/profile/hooks/useProfile'

const ProfilePage = () => {
  const { query, isReady } = useRouter()
  const user_id = query.user_id
  const [profile, getProfile, setProfileText] = useProfile()
  let [profileText, editText] = useState('')

  useEffect(() => {
    if (typeof user_id != 'string') return
    getProfile(user_id)
    editText(profile?.text ?? '')
  }, [isReady, profile?.text])

  return (
    <>
      {profile != undefined && (
        <>
          <div className="flex justify-center min-h-screen bg-[rgba(28,32,37,1)]">
            <div className="w-5/6 grid md:grid-cols-10 sm:grid-cols-1 gap-8 m-8">
              <div className="md:col-span-6">
                <UserName id={profile.id} name={profile.name}></UserName>
                <UserIcon icon_url={profile.icon_url}></UserIcon>
                <button
                  className={`[box-shadow:0px_0px_0px_1px_rgba(84,_89,_92,_1)_inset] [box-shadow-width:1px] px-0 py-2 gap-2.5 inline-flex justify-center items-center text-white text-left w-[200px] rounded-[30px] font-['Hiragino_Kaku_Gothic_Pro']`}
                >
                  <p className="text-lg m-0 tracking-[-0.64px] leading-[normal]">
                    プロフィールを編集する
                  </p>
                </button>
                <input
                  type="text"
                  value={profileText ?? ''}
                  onChange={(e) => editText(e.target.value)}
                ></input>
                <button
                  onClick={() => setProfileText(profileText ?? '', profile.id)}
                >
                  押す
                </button>
              </div>
              <div className="md:col-span-4">
                <button
                  onClick={() => setProfileText(profileText ?? '', profile.id)}
                >
                  押す
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <ProfileText text={_profile!.text}></ProfileText> */}
    </>
  )
}

export default ProfilePage
