import { useEvent } from '../../hooks/useEvent'

export const DeleteButton = () => {
  const { base, deleteEvent } = useEvent()

  return (
    <button
      className="w-1/2 h-12 border border-red-500 text-red-500 rounded-md hover:bg-zinc-800 active:bg-[rgba(28,32,37,1)]"
      onClick={async () => {
        if (!base.id) return
        alert('イベントを削除しますか？')
        // await deleteEvent(base.id)
        alert('イベントを削除しました')
      }}
    >
      イベントを削除する
    </button>
  )
}
