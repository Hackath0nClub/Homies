// components
import { UserName } from '../../../feature/profile/components/view/UserName'
import { UserIcon } from '../../../feature/profile/components/view/UserIcon'
import { UserText } from '../../../feature/profile/components/view/UserText'
import { UserCount } from '../../../feature/profile/components/view/UserCount'
import { UserEvent } from '../../../feature/profile/components/view/UserEvent'
import { ProfileButtons } from '../../../feature/profile/components/view/ProfileButtons '
import Footer from '../../../components/Footer'

// hooks
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useProfile } from '../../../feature/profile/hooks/useProfile'

const ProfilePage = () => {
  const { query, isReady } = useRouter()
  const user_id = query.user_id
  const { getProfile, getPerformanceEventByUserId } = useProfile()
 
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
                <ProfileButtons></ProfileButtons>
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
