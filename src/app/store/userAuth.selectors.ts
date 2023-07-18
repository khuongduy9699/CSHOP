import { createFeatureSelector } from "@ngrx/store";
import { UserDTO } from "src/api/user/user.dto";
import {userAuthReducer} from './userAuth.reducer'

export const selectUserAuth=createFeatureSelector<userAuthState>('userAuth');
export interface userAuthState {
  userAuth: UserDTO,
  isLoggedIn: boolean
}
