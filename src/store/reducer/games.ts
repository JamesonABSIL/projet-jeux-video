import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import {Igame } from "../../@types/types";
import axios from "axios";
import { RootState } from "..";
import { findById } from "../../hooks/findData";



interface IGameCredentials {
    video_game_name : string,
    platform_name: string,
    max_participants : string,
    begin_at :  string,
    // status: string,
}

interface GamesState {
  list: Igame[];
  loading : boolean;
  error : null | string;
  gameCredential : IGameCredentials;
}

export const initialState: GamesState ={
  list: [],
  loading: false,
  error: null,
  gameCredential: {
    video_game_name : "",
    platform_name: "",
    begin_at : "",
    max_participants : "",
    // status: "future",
  }
}
;

export const changeGameInput=createAction<string>('games/changeGameInput')
export const changePlatformInput=createAction<string>('games/changePlatformInput')
export const changeDateinput=createAction<string>('games/changeDateinput')
export const changeParticipantNumberinput=createAction<string>('games/changeMailRegister')
export const addPlayer=createAction('games/addPlayer')


export const fetchGames = createAsyncThunk(
  'Games/fetchGames',
  async (_, thunkAPI) => {
    const state=thunkAPI.getState() as RootState;
    const token=state.users.token
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/games`, {headers : { Authorization: `Bearer ${token}`},});
    return data;
  }
);


export const sendGame = createAsyncThunk(
  'Games/sendGame',
  async (_, thunkAPI) => {
    const state=thunkAPI.getState() as RootState;
    const token=state.users.token
    const informations = state.games.gameCredential as IGameCredentials;
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/games`, informations, {headers : { Authorization: `Bearer ${token}`},});
    return data;
  }
);


const gamesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGameInput, (state, action) => {
      state.gameCredential.video_game_name=action.payload  
      console.log(state.gameCredential.video_game_name)
    })
    
    .addCase(changeDateinput, (state,action) => {
      state.gameCredential.begin_at=action.payload
      console.log( state.gameCredential.begin_at)
    })
    .addCase(changePlatformInput, (state, action) => {
      state.gameCredential.platform_name=action.payload
      console.log(state.gameCredential.platform_name)
    })
    .addCase(changeParticipantNumberinput, (state, action) => {
      state.gameCredential.max_participants=action.payload
    })
    .addCase(fetchGames.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGames.fulfilled, (state, action)=> {
      state.loading=false;
      state.list=action.payload;
    })
    .addCase(fetchGames.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
      console.log(state.error)
    })
    .addCase(sendGame.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(sendGame.fulfilled, (state, action)=> {
      state.loading=false;
      state.list.push(action.payload)     
    })
    .addCase(sendGame.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
      console.log(state.error)
    }).addCase(addPlayer, (state, action) => {
      
    })
   
  });

export default gamesReducer;