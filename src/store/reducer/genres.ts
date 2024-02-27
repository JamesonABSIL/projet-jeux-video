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

/* Action de l'appel de l'API pour récupérer les Genres des jeux en base de données */
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
  // L'appelle à l'API est en train de se faire
    .addCase(fetchGenres.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
      // L'appelle à l'API a réussi, les données sont dans le action.payload, qu'on stock dans la list du state
    .addCase(fetchGenres.fulfilled, (state, action)=> {
      state.loading=false;
      state.list=action.payload;
    })
      // L'appelle à l'API a échoué, on stock les erreurs dans le state
    .addCase(fetchGenres.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
    })
  });

export default genresReducer;