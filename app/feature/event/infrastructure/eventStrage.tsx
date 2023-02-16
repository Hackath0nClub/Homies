import { supabase } from '../../../utils/supabaseClient'

type UploadFile = {
  file_name: string
  file: File
}

export const uploadEventImage = async ({ file_name, file }: UploadFile) => {
  try {
    const { error } = await supabase.storage
      .from('event')
      .upload(file_name, file, {
        contentType: 'image/png',
        upsert: true,
      })
    if (error) throw error
  } catch (error) {
    alert('Error')
    console.error(error)
  }
}
