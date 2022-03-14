import {
  Action,
  combineReducers,
  Reducer,
} from 'redux';

import authReducer from './auth';
import configReducer from './config';
import { RootState } from '../../interfaces/store';

export const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
}) as Reducer<RootState, Action>;
