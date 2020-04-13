import { IUserProfile } from '@/interfaces'

export interface State {
  token: string
  isLoggedIn: boolean | null
  loginError: string | null
  userProfile: IUserProfile | null
}
