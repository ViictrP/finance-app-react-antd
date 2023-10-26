const map = new Map();
map.set('other', 'Outro');
map.set('home', 'Casa');
map.set('food', 'Restaurante');
map.set('credit-card', 'Cartão de Crédito');
map.set('shop', 'Shop');

export const translateCategory = (category: string) => {
  return map.get(category) || category;
};
