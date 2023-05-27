// components
import { UserName } from '../../../feature/profile/components/view/UserName'
import { UserIcon } from '../../../feature/profile/components/view/UserIcon'
import { UserText } from '../../../feature/profile/components/view/UserText'
import { UserCount } from '../../../feature/profile/components/view/UserCount'
import { UserEvent } from '../../../feature/profile/components/view/UserEvent'
import Footer from '../../../components/Footer'

// hooks
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useProfile } from '../../../feature/profile/hooks/useProfile'

const ProfilePage = () => {
  const { query, isReady } = useRouter()
  const user_id = query.user_id
  const { isEditText, getProfile, getPerformanceEventByUserId, editUserText } = useProfile()

  useEffect(() => {
    if (typeof user_id != 'string') return
    getProfile(user_id)
    getPerformanceEventByUserId(user_id)
  }, [isReady])

  return (
    <>
      <div className="flex justify-center min-h-screen bg-[rgba(28,32,37,1)]">
        <div className="w-5/6 grid md:grid-cols-10 sm:grid-cols-1 gap-8 m-8">
          <div className="md:col-span-6">
            <div className="grid grid-cols-10">
              <div className="col-span-5">
                <UserIcon></UserIcon>
              </div>
              <div className="col-span-5 flex items-end">
                <button>
                  <img alt="Twitter" src="/playground_assets/twitter-icon.png" className="md:w-11 w-8 mx-3"></img>
                </button>
                <button
                  className={`grow [box-shadow:0px_0px_0px_1px_rgba(84,_89,_92,_1)_inset] [box-shadow-width:1px] px-0 py-2 inline-flex justify-center items-center text-white rounded-[30px] font-['Hiragino_Kaku_Gothic_Pro'] hover:bg-white hover:text-[rgba(28,32,37,1)]`}
                  onClick={() => editUserText(!isEditText)}
                >
                  <span className="text-lg px-8 m-0 tracking-[-0.64px]">
                    {!isEditText ?
                      <span>
                        プロフィールを編集する
                      </span>
                      :
                      <span>
                        編集を終了する
                      </span>
                    }
                  </span>
                </button>
              </div>
            </div>
            <UserName></UserName>
            <UserText></UserText>
            <UserCount></UserCount>
            <UserEvent></UserEvent>
          </div>
          <div className="md:col-span-4">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
