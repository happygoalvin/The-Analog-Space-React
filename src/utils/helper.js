export const getManufacturerName = (state, brandId) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i][0] === brandId) {
      return state[i][1];
    }
  }
};

export const getTypeName = (state, typeId) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i][0] === typeId) {
      return state[i][1];
    }
  }
};

export const getQuantity = (state, orderId) => {
  for (let i = 0; i < state.length; i++) {
    if (state[i][2] === orderId) {
      console.log("test")
      return <p>state[i][3]</p>
    }
  }
};
