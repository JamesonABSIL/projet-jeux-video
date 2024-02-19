export interface Ivideo_game {
  id: number,
  name: string,
  slug: string,
  genres: Igenre[],
  platforms: Iplatform[],
  games: Igames[],
  cover: string,  
  description: string,
}

export interface IhomeList {
  id : number,
  slug : string,
  cover :string
}

export interface Iplatform {
  id : number,
  name : string,
  slug : string, 
  videoGames : Ivideo_game[]
  logo: string,
}

export interface Igenre {
  id: Number,
  name: string,
  slug: string,
  videoGames: Ivideo_game[],
  image: string,
  description: string,
}

export interface Iuser {
  id : number,
  email: string,
  roles: string[],
  password: string,
  pseudo: string,
  games : Igame[],
  participatedIn : Igame[],
  favorites : Ivideo_game[],
  is_active : boolean,
}

export interface Igame {
  id : string | number,
  organizer : Iuser,
  participants : Iuser[],
  videoGame : Ivideo_game,
  platform_id: number,
  beginAt : string ,
  status:string,
  slug:string,
  name:string,
  maxParticipants : number,
}