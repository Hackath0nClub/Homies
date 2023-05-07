import { supabase } from '../../../utils/supabaseClient'

type UploadFile = {
  filename: string
  file: File
}

export const uploadGuestImage = async ({ filename, file }: UploadFile) => {
  try {
    const { data, error } = await supabase.storage
      .from('guest')
      .upload(filename, file, {
        contentType: 'image/png',
        upsert: true,
      })
    if (error) throw error
    console.log(data)
  } catch (error) {
    alert('Error')
    console.error(error)
  }
}

export const getImageUrl = async (filename: string) => {
  try {
    const res = await supabase.storage.from('guest').getPublicUrl(filename)
    return res.data.publicUrl
  } catch (error) {
    alert('Error')
    console.error(error)
  }
}
