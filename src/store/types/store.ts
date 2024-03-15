import {IApp} from './app'

export interface IInitialState {
  app: IApp
}

export interface IError {
  code: number
  message: string
}
