export const getManufacturerName = (state, brandId) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i][0] === brandId) {
      return state[i][1];
    }
  }
};
