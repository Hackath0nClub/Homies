import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AutoRedirectPage = () => {
  const router = useRouter()
  const { query, isReady } = useRouter()
  useEffect(() => {
    if (isReady) router.push('/event/' + query.id + '/view')
  }, [isReady])

  return null
}

export default AutoRedirectPage
