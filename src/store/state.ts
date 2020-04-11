import { IUserProfile } from '@/interfaces'

export interface State {
  token: string;
  isLoggedIn: boolean | null;
  userProfile: IUserProfile | null;
}
