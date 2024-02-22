export function findByName(datas , name : string | undefined) {
  const game = datas.find((game) => {
    return game.name === name;
  });
  return game;
}

export function findBySlug(datas , slug : string | undefined) {
  const game = datas.find((game) => {
    return game.slug == slug;
  });
  return game;
}
export function findById(datas , id : string | undefined) {
  const game = datas.find((game) => {
    return game.id == id;
  });
  return game;
}
export function findByPseudo(datas , pseudo : string | undefined) {
  const game = datas.find((game) => {
    return game.organizer.pseudo === pseudo;
  });
  return game;
}