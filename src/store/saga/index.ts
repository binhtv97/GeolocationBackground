import {all} from 'redux-saga/effects'
// Saga Imports
import appSaga from './app'

export default function* rootSaga() {
  yield all([
    // Sagas
    ...appSaga,
  ])
}
