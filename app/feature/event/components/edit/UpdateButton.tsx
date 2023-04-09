import { useEvent } from '../../../../feature/event/hooks/useEvent'

export const UpdateButton = () => {
  const { updateEvent } = useEvent()
  return (
    <button
      className="px-4 py-2 mt-4 text-white transition-colors duration-300 border border-gray-200 bg-[rgba(28,32,37,1)] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      onClick={updateEvent}
    >
      イベントページを更新
    </button>
  )
}
