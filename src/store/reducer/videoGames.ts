import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import {IhomeList, Ivideo_game } from "../../@types/types";
import axios from "axios";
import { RootState } from "..";


interface VideogamesState {
  list: Ivideo_game[];
  homeList : IhomeList[];
  loading : boolean;
  error : null | string;
  token : null | String;
}

export const initialState: VideogamesState ={
  list: [],
  homeList:[],
  loading: false,
  error: null,
  token: null,
}
;

export const fetchVideoGames = createAsyncThunk(
  'VideoGames/fetchVideoGames',
  async (_, thunkAPI) => {
    const state=thunkAPI.getState() as RootState;
    const token=state.users.token
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/video-games`, {headers : { Authorization: `Bearer ${token}`},});
    return data;
  }
);

export const fetchVideoGamesHome = createAsyncThunk(
  'VideoGames/fetchVideoGamesHome',
  async () => {
    const { data } = await axios.get(`https://andre-appaoo-server.eddi.cloud/projet-08-jeux-video-back/public/api/video-games/covers`);
    return data;
  }
);

const videoGamesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchVideoGames.pending, (state, ) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchVideoGames.fulfilled, (state, action)=> {
      state.loading=false;
      state.list=action.payload;
    })
    .addCase(fetchVideoGames.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
    }).addCase(fetchVideoGamesHome.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchVideoGamesHome.fulfilled, (state, action)=> {
      state.loading=false;
      state.homeList=action.payload;
    })
    .addCase(fetchVideoGamesHome.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
    })
    
  });

export default videoGamesReducer;