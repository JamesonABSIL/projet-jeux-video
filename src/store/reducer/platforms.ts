import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import {Iplatform } from "../../@types/types";
import axios from "axios";
import { RootState } from "..";


interface PlatformsState {
  list: Iplatform[];
  loading : boolean;
  error : null | string;
}

export const initialState: PlatformsState ={
  list: [],
  loading: false,
  error: null,
}
;
export const fetchPlatforms = createAsyncThunk(
  'platforms/fetchPlatforms',
  async (_, thunkAPI) => {
    const state=thunkAPI.getState() as RootState;
    const token=state.users.token
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/platforms`, {headers : { Authorization: `Bearer ${token}`},});
    return data;
  }
);

const platformsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPlatforms.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchPlatforms.fulfilled, (state, action)=> {
      state.loading=false;
      state.list=action.payload;
    })
    .addCase(fetchPlatforms.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
    })
  });

export default platformsReducer;