import { createAction, createReducer } from '@reduxjs/toolkit'

export interface AuthState {
  value: number
}

const increment = createAction('auth/increment')
const decrement = createAction('auth/decrement')
const incrementByAmount = createAction<number>('auth/incrementByAmount')

const initialState = { value: 0 } as AuthState;

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.value++
    })
    .addCase(decrement, (state, action) => {
      state.value--
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload
    })
})

export default authReducer;
