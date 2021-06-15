const INITIAL_STATE = {
  user: null,
  modalOpen: false,
  modalBody: null,
  isLogin:false
};

export const UserActionTypes = {
  LOGIN_USER: 'LOGIN_USER',
  SIGNUP_USER: 'SIGNUP_USER',
  FORGOT_PASSWORD_USER: 'FORGOT_PASSWORD_USER',
  SIGN_OUT_USER: 'SIGN_OUT_USER',

  
  SET_USER:'SET_USER',

  SET_MODAL_STATE: 'SET_MODAL_STATE',
  SET_MODAL_BODY: 'SET_MODAL_BODY',
};

export const loginUser = (email , password) => ({ type: UserActionTypes.LOGIN_USER, payload: {email , password} });
export const signUpUser = (user) => ({ type: UserActionTypes.SIGNUP_USER, payload: {user} });
export const signOutUser = () => ({ type: UserActionTypes.SIGN_OUT_USER });
export const forgotPasswordUser = (email) => ({ type: UserActionTypes.FORGOT_PASSWORD_USER, payload: {email} });

export const modalOpenState = (value) => ({ type: UserActionTypes.SET_MODAL_STATE, payload: {value} });
export const modalBodyState = (component) => ({ type: UserActionTypes.SET_MODAL_BODY, payload: {component} });

export const setUser = (user , login) => ({type:UserActionTypes.SET_USER , payload:{user , login}});
export const userReducer = (state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case UserActionTypes.SET_MODAL_STATE:
      return { ...state, modalOpen: action.payload.value };

    case UserActionTypes.SET_MODAL_BODY:
      return { ...state, modalBody: action.payload.component };
    case UserActionTypes.SET_USER:
   
      return {...state ,  user:action.payload.user , isLogin: action.payload.login}
    default:
      return state;
  }
};


export const modalOpenSelector = (state) => state.users.modalOpen;
export const modalBodySelector = (state) => state.users.modalBody;
export const setUserSelector = (state) => state.users.user;
export const setLoginSelector = (state) => state.users.isLogin;
