import { AppThunkDispatch } from '../../core/store/store';
import { ConfigState } from '../store/reducers/config';

export interface RootState {
  auth: Record<string, any>;
  config: ConfigState;
}

export type FeatureNames = keyof RootState;

export type ValidationError<T = undefined> = T | unknown;

export interface ThunkHandlers {
  dispatch: AppThunkDispatch;
  rejectValue: ValidationError;
}
