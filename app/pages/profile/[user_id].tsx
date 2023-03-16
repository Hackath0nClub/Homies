// components
import { UserName } from '../../feature/profile/components/UserName'
import { UserIcon } from '../../feature/profile/components/UserIcon'
import { UserText } from '../../feature/profile/components/UserText'
import { UserCount } from '../../feature/profile/components/UserCount'

// hooks
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useProfile } from '../../feature/profile/hooks/useProfile'

const ProfilePage = () => {
  const { query, isReady } = useRouter()
  const user_id = query.user_id
  const [profile, getProfile, setProfileText] = useProfile()
  let [isEdit, editProfile] = useState<boolean>(false)

  useEffect(() => {
    if (typeof user_id != 'string') return
    getProfile(user_id)
  }, [isReady])

  return (
    <>
      {profile != undefined && (
        <>
          <div className="flex justify-center min-h-screen bg-[rgba(28,32,37,1)]">
            <div className="w-5/6 grid md:grid-cols-10 sm:grid-cols-1 gap-8 m-8">
              <div className="md:col-span-6">

                <div className="grid grid-cols-10">
                  <div className="col-span-5">
                    <UserIcon icon_url={profile.icon_url}></UserIcon>
                  </div>
                  <div className="col-span-5 flex items-end">
                    <button>
                      <img alt="Twitter" src="/playground_assets/twitter-icon.png" className="md:w-11 w-8 mx-3"></img>
                    </button>
                    <button
                      className={`grow [box-shadow:0px_0px_0px_1px_rgba(84,_89,_92,_1)_inset] [box-shadow-width:1px] px-0 py-2 inline-flex justify-center items-center text-white rounded-[30px] font-['Hiragino_Kaku_Gothic_Pro'] hover:bg-white hover:text-[rgba(28,32,37,1)]`}
                      onClick={() => editProfile(!isEdit)}
                    >
                      <span className="text-lg px-8 m-0 tracking-[-0.64px]">
                        プロフィールを編集する
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <UserName id={profile.id} name={profile.name}></UserName>
                  <UserText text={profile.text} id={profile.id} setProfileText={setProfileText} isEdit={isEdit}></UserText>
                </div>
                <div>
                  <UserCount></UserCount>
                </div>

              </div>
              <div className="md:col-span-4">
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
