import { createReducer, on } from '@ngrx/store';
import { UserDTO } from 'src/api/user/user.dto';
import { userAuthActions } from './userAuth.actions';
import { userAuthState } from './userAuth.selectors';
import { getCookie } from 'src/shared/utils';

export const initialState: userAuthState = {
  userAuth: {userName: '', password: ''},
  isLoggedIn: false,
}
export const userAuthReducer = createReducer(
  initialState,
  on(userAuthActions.getUserAuth, (_state,  {userAuth} ) => ({..._state, userAuth})),
  on(userAuthActions.logIn, (_state, {isLoggedIn})=> ({..._state, isLoggedIn})),
  on(userAuthActions.logOut, (_state, {isLoggedIn})=> ({...initialState}))
);
