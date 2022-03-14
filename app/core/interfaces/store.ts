import { AppThunkDispatch } from '../../core/store/store';
import { AuthState } from '../store/reducers/auth';
import { ConfigState } from '../store/reducers/config';

export interface RootState {
  auth: AuthState;
  config: ConfigState;
}

export type FeatureNames = keyof RootState;

export type ValidationError<T = undefined> = T | unknown;

export interface ThunkHandlers {
  dispatch: AppThunkDispatch;
  rejectValue: ValidationError;
}
