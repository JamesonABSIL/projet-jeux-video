import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import { Igame } from '../../@types/types';
import axios from 'axios';
import { RootState } from '..';
import { findById } from '../selectors/findData';

interface IGameCredentials {
  video_game_name: string;
  platform_name: string;
  maxParticipants: string;
  beginAt: string;
}

interface GamesState {
  list: Igame[];
  loading: boolean;
  error: null | string;
  gameCredential: IGameCredentials;
}

export const initialState: GamesState = {
  list: [],
  loading: false,
  error: null,
  gameCredential: {
    video_game_name: '',
    platform_name: '',
    beginAt: '',
    maxParticipants: '',
  },
};
// Actions qui gèrent le filtre du formulaire de création de partie
export const changeGameInput = createAction<string>('games/changeGameInput');
export const changePlatformInput = createAction<string>(
  'games/changePlatformInput'
);
export const changeDateinput = createAction<string>('games/changeDateinput');
export const changeParticipantNumberinput = createAction<string>(
  'games/changeMailRegister'
);

// Appel API pour récupérer les informations des parties
export const fetchGames = createAsyncThunk(
  'Games/fetchGames',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.users.token;
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/games`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);
// Appel API qui permet d'envoyer les données récupérer dans le formulaire de création d'une partie
export const sendGame = createAsyncThunk(
  'Games/sendGame',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.users.token;
    const informations = state.games.gameCredential as IGameCredentials;
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/games`,
      informations,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }
);
// Appel API qui permet à un utilisateur de pourvoir réjoindre une partie via un ID (passage de l'id en argument de l'appel AXIOS)
export const joinAGame = createAsyncThunk(
  'Games/joinAGame',
  async (id: number | string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.users.token;
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/join_game/${id}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
);
// Appel API qui permet de modifier les données d'une partie via un ID (passage de l'id en argument de l'appel AXIOS)
export const updateGame = createAsyncThunk(
  'Games/updateGame',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.users.token;
    const informations = state.games.gameCredential as IGameCredentials;

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/games/${id}`,
      informations,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
);
// Appel API qui permet de modifier le statut d'une partie et de la passée en "finished"
export const updateGameStatus = createAsyncThunk(
  'Games/updateGameStatus',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.users.token;
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/games/${id}`,
      { status: 'finished' },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  }
);
// Appel API pour la suppression d'un jeu avec le passage d'un ID
export const deleteGame = createAsyncThunk(
  'Games/deleteGame',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.users.token;
    const informations = state.games.gameCredential as IGameCredentials;
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/games/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }
);

const gamesReducer = createReducer(initialState, (builder) => {
  builder
    // States qui gèrent le filtre du formulaire de création de partie
    .addCase(changeGameInput, (state, action) => {
      state.gameCredential.video_game_name = action.payload;
    })

    .addCase(changeDateinput, (state, action) => {
      state.gameCredential.beginAt = action.payload;
    })
    .addCase(changePlatformInput, (state, action) => {
      state.gameCredential.platform_name = action.payload;
    })
    .addCase(changeParticipantNumberinput, (state, action) => {
      state.gameCredential.maxParticipants = action.payload;
    })
    // States de l'appel API de fetchGames
    .addCase(fetchGames.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(fetchGames.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(fetchGames.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    })
    // States de l'appel API de sendGame
    .addCase(sendGame.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(sendGame.fulfilled, (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    })
    .addCase(sendGame.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    })
    // States de l'appel API de deleteGame
    .addCase(deleteGame.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(deleteGame.fulfilled, (state, action) => {
      // Récupère l'index lors du clic
      const index = action.meta.arg;
      // Récupération de la position de la première valeure correspondante dans le tableau
      const pos = state.list.map((e) => e.id).indexOf(index);
      // Supprime 1 élément à partir de pos
      state.list.splice(pos, 1);
    })
    .addCase(deleteGame.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    })
    // States de l'appel API de joinAGame
    .addCase(joinAGame.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(joinAGame.fulfilled, (state, action) => {
      state.loading = false;
      // Récupération de la position de la première valeure correspondante dans le tableau
      const pos = state.list.map((e) => e.id).indexOf(action.payload.id);
      // Remplace 1 élément à l'index pos par action.payload.
      state.list.splice(pos, 1, action.payload);
    })
    .addCase(joinAGame.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    })
    // States de l'appel API de updateGame
    .addCase(updateGame.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(updateGame.fulfilled, (state, action) => {
      state.loading = false;
      // Récupération de la position de la première valeure correspondante dans le tableau
      const pos = state.list.map((e) => e.id).indexOf(action.payload.id);
      // Remplace 1 élément à l'index pos par action.payload.
      state.list.splice(pos, 1, action.payload);
    })
    .addCase(updateGame.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    })
    // States de l'appel API de updateGameStatus
    .addCase(updateGameStatus.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(updateGameStatus.fulfilled, (state, action) => {
      state.loading = false;
      // Récupération de la position de la première valeure correspondante dans le tableau
      const pos = state.list.map((e) => e.id).indexOf(action.payload.id);
      // Remplace 1 élément à l'index pos par action.payload. Action.payload étant l'objet de la partie sur laquelle on a agit
      state.list.splice(pos, 1, action.payload);
    })
    .addCase(updateGameStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
});

export default gamesReducer;
