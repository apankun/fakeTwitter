import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  addTwitter,
  getTwittersList,
  getTwitterDetail,
  deleteTwitter,
  editTwitter
} from '@/apis/index'
import { Twitter } from '@/types'

interface TwiState {
  twiList: Array<Twitter>
  currTwi: Twitter
  isLoading: boolean
}

const twiGet = createAsyncThunk('/twi/get', async (id: number) => {
  const res = await getTwitterDetail(id)
  return res?.code === 200 ? res.data : res
})

const twiDelete = createAsyncThunk(
  '/twi/delete',
  async (id: number, { dispatch }) => {
    const res = await deleteTwitter(id)
    if (res.code === 200) {
      dispatch(actions.twiListGet())
    }
  }
)

const twiAdd = createAsyncThunk(
  '/twi/add',
  async (twitter: Twitter, { dispatch }) => {
    const res = await addTwitter(twitter)
    if (res.code === 200) {
      dispatch(actions.twiListGet())
    }
  }
)

const twiListGet = createAsyncThunk('/twi/fetch', async () => {
  const res = await getTwittersList()
  return res?.code === 200 ? res.data : res
})

const twiEdit = createAsyncThunk('/twi/edit', async (twitter: Twitter) => {
  const res = await editTwitter(twitter)
  return res?.code === 200 ? res.data : res
})

const initialState: TwiState = {
  twiList: [],
  currTwi: {} as Twitter,
  isLoading: false
}

export const twiSlice = createSlice({
  name: 'Twi',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(twiGet.fulfilled, (state, action) => {
      state.currTwi = action.payload as Twitter
    })
    builder.addCase(twiListGet.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(twiListGet.fulfilled, (state, action: any) => {
      const list: Array<Twitter> = []
      Object.values(action.payload as object).forEach((i) => {
        list.unshift(i)
      })
      state.twiList = list
      state.isLoading = false
    })
  }
})

export const actions = {
  ...twiSlice.actions,
  twiAdd,
  twiDelete,
  twiEdit,
  twiGet,
  twiListGet
}
