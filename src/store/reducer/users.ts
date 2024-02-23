import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { Igame, Iuser, Ivideo_game } from "../../@types/types";
import axios from "axios";
import { Await } from "react-router-dom";
import { RootState } from "..";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

interface ICredentials {
  username: string;
  password: string;
}

interface CurrentUser {
  id : number,
  pseudo : string ,
  email: string,
  games : Igame[],
  participatedIn : Igame[],
  favorites : Ivideo_game[],
  is_active : boolean,
  isVerified: Boolean;
}

interface Iregister {
  pseudo : string,
  email : string,
  password : string,
  passwordCheck: string,
}

interface UsersState {
  is_active: Boolean;
  
  logged: boolean;
  currentUser : CurrentUser
  list: Iuser[];
  loading : boolean;
  error : null | string;
  credentials : ICredentials;
  token: null | string;
  register: Iregister;
}
// Initialisation du State
export const initialState: UsersState ={
  is_active: false,
  logged: localStorage.getItem('token')? true : false,
  currentUser : {
    id : 0,
    pseudo : "",
    email : "",
    games : [],
    participatedIn: [],
    favorites : [],
    is_active : false,
    isVerified: false,
  },
  list: [],
  loading: false,
  error: null,
  token: localStorage.getItem('token')? localStorage.getItem('token') : null,
  credentials: {
    username : '',
    password : '',
  },
  register : {
    pseudo : "",
    email :"",
    password : "",
    passwordCheck: "",
  }
};
// Logout Action
export const logout = createAction('user/logout');
// Login Actions
export const changeMail=createAction<string>('users/changeMail')
export const changePassword=createAction<string>('users/changePassword')
// Profil Actions


// Appel Api pour le log du User avec récupération des données de l'utilisateur
export const login = createAsyncThunk(
  'users/login',
  async (_, thunkAPI) => {
    const state=thunkAPI.getState() as RootState;
    const credentials = state.users.credentials as ICredentials;
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/login_check`, credentials); 
    axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` };
    localStorage.setItem("token" ,data.token)
    return data;
  }
);

export const loginAuth = createAsyncThunk(
  'users/loginAuth',
  async (_, thunkAPI) => {
    const state=thunkAPI.getState() as RootState;
    const token = state.users.token
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/current`, {headers : { Authorization: `Bearer ${token}`},}); 
    axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` };
    return data;
  }
);

// Register Actions
export const changeMailRegister=createAction<string>('users/changeMailRegister')
export const changePasswordRegister=createAction<string>('users/changePasswordRegister')
export const changePseudoRegister=createAction<string>('users/changePseudoRegister')
export const changePasswordCheckRegister=createAction<string>('users/changePasswordCheckRegister')

export const updateFavorite = createAsyncThunk('users/updateFavorite', 
async (id : number, thunkAPI) => {
  const state=thunkAPI.getState() as RootState;
  const token = state.users.token
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/users/add_favorite/${id}`, null,
     { headers: { Authorization: `Bearer ${token}` } }
   );
   return data
 })
  


// Appel API pour le register du User
export const register = createAsyncThunk('users/register',
async (_, thunkAPI) => {
  const state=thunkAPI.getState() as RootState;
    const register = state.users.register as Iregister;
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, register )
  return data;
}
)


const usersReducer = createReducer(initialState, (builder) => {
  builder
  // API Register Actions
  .addCase(changeMail, (state, action)=> {
    state.credentials.username=action.payload
  }).addCase(changePassword, (state, action)=> {
    state.credentials.password=action.payload
  }).addCase(changeMailRegister, (state, action)=> {
    state.register.email=action.payload  
  }).addCase(changePasswordRegister, (state, action)=> {
    state.register.password=action.payload
  }).addCase(changePasswordCheckRegister, (state, action)=> {
    state.register.passwordCheck=action.payload
  }).addCase(changePseudoRegister, (state, action)=> {
    state.register.pseudo=action.payload
  })
  // API Statut
    .addCase(login.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action)=> {
      const{ token } =action.payload;
      const {pseudo, favorites, games, id, participatedIn, email, is_active, isVerified } = action.payload.user
      state.currentUser.pseudo=pseudo;
      state.currentUser.favorites=favorites;
      state.currentUser.games=games;
      state.currentUser.id=id;
      state.currentUser.participatedIn=participatedIn;
      state.currentUser.email=email;
      state.currentUser.is_active=is_active;
      state.currentUser.isVerified=isVerified;
      
      state.token = token;
      state.loading=false;
      state.logged=true;
      state.credentials.username = '';
      state.credentials.password = '';
      

    })
    .addCase(login.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
    })
    .addCase(logout, (state) => {
      state.currentUser.pseudo= "";
      state.logged = false;
      state.token= null;
      localStorage.clear()
      // Suppression du token dans le header
      axios.defaults.headers.common = {} ;
    })
    .addCase(register.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(register.fulfilled, (state, action)=> {
      const{ pseudo, token, logged } =action.payload;
      state.loading=false;
    })
    .addCase(register.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
      console.log(action)})
    .addCase(updateFavorite.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
    .addCase(updateFavorite.fulfilled, (state, action)=> {
        console.log(action.payload)
        state.currentUser.favorites=action.payload.favorites
      })
    .addCase(updateFavorite.rejected, (state, action)=> {
        state.loading=false;
        state.error=action.error.message as string;
    }).addCase(loginAuth.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(loginAuth.fulfilled, (state, action)=> {
      const {pseudo, favorites, games, id, participatedIn, email, is_active, isVerified } = action.payload
      state.currentUser.pseudo=pseudo;
      state.currentUser.favorites=favorites;
      state.currentUser.games=games;
      state.currentUser.id=id;
      state.currentUser.participatedIn=participatedIn;
      state.currentUser.email=email;
      state.currentUser.is_active=is_active;
      state.currentUser.isVerified=isVerified;
      console.log(action.payload)
    })
    .addCase(loginAuth.rejected, (state, action)=> {
      state.loading=false;
      state.error=action.error.message as string;
    })
  });

export default usersReducer;