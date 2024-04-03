export function findByName(datas : any, name : string | undefined) {
  const game = datas.find((game : any) => {
    return game.name === name;
  });
  return game;
}

export function findBySlug(datas : any, slug : string | undefined) {
  const gameSearched = datas.find((game: any ) => {
    return game.slug == slug;
  });
  return gameSearched;
}
export function findById(datas: any , id : number | undefined | string) {
  const game = datas.find((game: any) => {
    return game.id == id;
  });
  return game;
}
export function findByPseudo(datas : any, pseudo : string | undefined) {
  const game = datas.find((game: any) => {
    return game.organizer.pseudo === pseudo;
  });
  return game;
}