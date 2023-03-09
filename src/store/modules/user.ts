import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, register } from '@/apis/index'
import { User } from '@/types'
import { getCurrUser } from '@/services'

interface UserState {
  username: string
  password?: any
  isLogin?: boolean
  msg?: string
}

const doLogin = createAsyncThunk('/login', async (user: User) => {
  const res = await login(user)
  if (res.code === 200) {
    return {
      ...res.data,
      isLogin: true
    }
  } else {
    return {
      ...res.data,
      msg: res.msg
    } as UserState
  }
})

const doRegister = createAsyncThunk('/register', async (user: User) => {
  const res = await register(user)
  if (res.code === 200) {
    return {
      ...res.data,
      isLogin: true
    }
  } else {
    return {
      ...res.data,
      isLogin: false,
      msg: res.msg
    } as UserState
  }
})

const initialState: UserState = {
  username: '',
  isLogin: false,
  msg: ''
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    resetUser: (state, action) => {
      Object.assign(state, { ...action.payload, msg: '' })
    },
    getUserInfo: (state) => {
      const userInfo = getCurrUser()
      if (userInfo?.username) {
        state.username = userInfo.username
        state.isLogin = true
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      Object.assign(state, action.payload)
    })
    builder.addCase(doRegister.fulfilled, (state, action) => {
      Object.assign(state, {
        ...action.payload
      })
    })
  }
})

export const actions = {
  ...userSlice.actions,
  doLogin,
  doRegister
}
