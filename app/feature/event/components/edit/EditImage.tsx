import { useRef } from 'react'
import { useEvent } from '../../hooks/useEvent'

export const EditImageRow = () => {
  const { base, file, setFile } = useEvent()
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const local_file = e.target.files?.[0]
    if (local_file) setFile(local_file)
  }

  return (
    <>
      <input
        hidden
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={uploadImage}
      />
      <button
        className="px-4 py-2 mt-4 text-white transition-colors duration-300 border border-gray-200 bg-[rgba(28,32,37,1)] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        onClick={() => inputRef.current?.click()}
      >
        画像をアップロード
      </button>

      <img
        alt={base.title}
        src={file ? URL.createObjectURL(file) : base.image_url}
        className="w-full my-4 rounded-lg"
      />
    </>
  )
}
