import { useEvent } from '../../../../feature/event/hooks/useEvent'

export const EditTitleRow = () => {
  const { base, setTitle } = useEvent()
  return (
    <>
      <label className="block text-gray-500 dark:text-gray-300">
        イベントタイトル
      </label>
      <input
        type="text"
        className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        value={base.title ?? ''}
        onChange={(e) => setTitle(e.target.value)}
      />
    </>
  )
}
