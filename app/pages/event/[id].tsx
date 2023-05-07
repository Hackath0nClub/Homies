import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AutoRedirectPage = () => {
  const router = useRouter()
  const { query, isReady } = useRouter()
  useEffect(() => {
    router.push('/event/' + query.id + '/view')
  }, [isReady])
}

export default AutoRedirectPage
