import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { Igenre } from "../../@types/types";
import axios from "axios";
import { RootState } from "..";


interface GenresState {
  list: Igenre[];
  loading : boolean;
  error : null | string;
  token: null | string;
}

export const initialState: GenresState ={
  list: [],
  loading: false,
  error: null,
  token: null,
}
;

export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async (_, thunkAPI) => {
    const state=thunkAPI.getState() as RootState;
    const token=state.users.token
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/genres`, {headers : { Authorization: `Bearer ${token}`},});
    return data;
  }
);

const genresReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchGenres.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGenres.fulfilled, (state, action)=> {
      state.loading=false;
      state.list=action.payload;
    })
    .addCase(fetchGenres.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
    })
  });

export default genresReducer;