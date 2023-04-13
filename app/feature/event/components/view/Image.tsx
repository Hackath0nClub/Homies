import { useEvent } from '../../../../feature/event/hooks/useEvent'

export const Image = () => {
  const { base } = useEvent()
  return <img alt="" src={base.image_url} className="w-full my-4 rounded-lg" />
}
