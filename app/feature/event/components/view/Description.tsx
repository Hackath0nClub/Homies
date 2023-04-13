import { useEvent } from '../../../../feature/event/hooks/useEvent'

export const Description = () => {
  const { base } = useEvent()
  return (
    <>
      <p className="text-white text-left font-bold text-2xl my-4">
        イベント概要
      </p>
      <p className="whitespace-pre-wrap text-white text-base">{base.text}</p>
    </>
  )
}
