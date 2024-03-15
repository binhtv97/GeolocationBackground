import {AnyAction} from 'redux'
import {takeLatest} from 'redux-saga/effects'
import {appActions} from '../reducers'

function* getAppSettingSaga(): IterableIterator<AnyAction> {}

export default [takeLatest(appActions.changeNotification.type, getAppSettingSaga)]
