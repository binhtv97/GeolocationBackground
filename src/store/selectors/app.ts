import {IInitialState} from '../types'

export const getStatusSendNotification = (state: IInitialState): boolean => state.app.sendNotification
export const getStatusBackgroundCheck = (state: IInitialState): boolean => state.app.backgroundChecker
export const getTimeRecord = (state: IInitialState): number => state.app.timeRecord
