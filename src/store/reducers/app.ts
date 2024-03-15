import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {IApp} from '../types'

export const appInitialState: IApp = {
  sendNotification: true,
  backgroundChecker: true,
  timeRecord: 8000,
}

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    changeNotification: (state, action: PayloadAction<boolean>) => {
      state.sendNotification = action.payload
    },
    changeTimeRecord: (state, action: PayloadAction<number>) => {
      state.timeRecord = action.payload
    },
    changeNotifiStatus: (state, action: PayloadAction<boolean>) => {
      state.sendNotification = action.payload
    },
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
