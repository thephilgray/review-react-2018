const initialState = {
  user: {},
  isAuth: false,
  profile: {}
};

export default (state = initialState, action) => {
  const user = Object.assign({}, state.user);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        isAuth: Object.keys(action.user).length > 0,
        user: action.user
      };
    case 'FOLLOW_USER':
      user.following.push(action.user_id);
      return {
        ...state,
        user
      };
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
};
