import { useEvent } from '../../../../feature/event/hooks/useEvent'
import { useTimetable } from '../../hooks/useTimetable'

export const UpdateButton = () => {
  const { updateEvent } = useEvent()
  const { updateTimetable } = useTimetable()

  return (
    <button
      className="border border-white px-20 py-3 gap-2.5 text-white font-bold bg-gradient-to-r from-[rgba(232,112,39,1)] to-[rgba(232,189,39,1)] rounded-3xl transition-transform duration-200 ease-in-out transform hover:scale-95"
      onClick={async () => {
        await updateEvent()
        await updateTimetable()
        alert('イベントページを更新しました')
      }}
    >
      イベントページを更新
    </button>
  )
}
