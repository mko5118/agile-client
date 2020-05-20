

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
}

export const authReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    default:
      return state;
  }
};