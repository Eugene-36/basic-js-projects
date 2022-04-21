import { all } from 'redux-saga/effects';
import { countWatcher } from './countSaga';
import { userWathcer } from './userSaga';

// Позволяет объеденить несколько вотчеров
export function* rootWatcher() {
  yield all([countWatcher(), userWathcer()]);
}
