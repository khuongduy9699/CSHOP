import { createAction, createActionGroup, props } from '@ngrx/store';
import { UserDTO } from 'src/api/user/user.dto';

export const userAuthActions = createActionGroup({
  source: 'User Auth',
  events: {
    'Get User Auth': props<{userAuth: UserDTO}>(),
    'Log In': props<{isLoggedIn : boolean}>(),
    'Log Out': props<{isLoggedIn : boolean}>(),
}});
