import { supabase } from '../../../utils/supabaseClient'
import { getCurrentDateTime } from '../../../lib/getCurrentDateTime'

export const googleSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) throw error
  } catch (error) {
    console.error(error)
    if (error instanceof Error) alert(error.message)
  }
}

export const emailSignIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) throw error
  } catch (error) {
    console.error(error)
    if (error instanceof Error) alert(error.message)
  }
}

export const emailSignUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) throw error
    if (!data.user) return
    // Sign up時にprofileを作成する
    const { data: profileData, error: profileError } = await supabase
      .from('profile')
      .insert({
        uuid: data.user.id,
        id: data.user.email?.split('@')[0] + getCurrentDateTime(),
        name: data.user.email?.split('@')[0],
        icon_url: null,
        text: '',
        twitter_url: '',
        soundcloud_url: '',
        mixcloud_url: '',
        create_at: data.user.created_at,
        updated_at: data.user.created_at,
      })
    if (profileError) throw profileError
  } catch (error) {
    console.error(error)
    if (error instanceof Error) alert(error.message)
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error(error)
    if (error instanceof Error) alert(error.message)
  }
}

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  } catch (error) {
    console.error(error)
    if (error instanceof Error) alert(error.message)
  }
}
