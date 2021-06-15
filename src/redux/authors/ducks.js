const INITIAL_STATE = {
  author:null,
  setAction: null,
  authorId:null,
};

export const AuthorActionTypes = {
  ADD_AUTHOR: 'ADD_AUTHOR',
  READ_AUTHOR: 'READ_AUTHOR',
  UPDATE_AUTHOR: 'UPDATE_AUTHOR',
  DELETE_AUTHOR: 'DELETE_AUTHOR',

  SET_AUTHOR: 'SET_AUTHOR',
  SET_ACTION: 'SET_ACTION',
  SET_AUTHOR_ID: 'SET_AUTHOR_ID'
};

export const addAuthor = (data) => ({ type: AuthorActionTypes.ADD_AUTHOR, payload: { data } });
export const readAuthor = (id) => ({ type: AuthorActionTypes.READ_AUTHOR, payload: { id } });
export const updateAuthor = (id, data) => ({ type: AuthorActionTypes.UPDATE_AUTHOR, payload: { id, data } });
export const deleteAuthor = (id) => ({ type: AuthorActionTypes.DELETE_AUTHOR, payload: { id } });
export const setAuthorNull = () => ({ type: AuthorActionTypes.SET_AUTHOR, payload: { author:null , id:null} });
export const setAction = (value) => ({ type: AuthorActionTypes.SET_ACTION, payload: { value } });
export const setAuthorId = (id) => ({type:AuthorActionTypes.SET_AUTHOR_ID, payload:{id}});

export const authorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthorActionTypes.ADD_AUTHOR:
    case AuthorActionTypes.UPDATE_AUTHOR:
    case AuthorActionTypes.DELETE_AUTHOR:
      return state;
    case AuthorActionTypes.SET_AUTHOR_ID:
      return {...state , authorId: action.payload.id};
    case AuthorActionTypes.SET_AUTHOR:
      return { ...state, author: action.payload.author , authorId: action.payload.id};
    case AuthorActionTypes.SET_ACTION:
      return { ...state, setAction: action.payload.value };
    default:
      return state;
  }
};

export const setAuthorSelector = (state) => state.authors.author;
export const setActionSelector = (state) => state.authors.setAction;
export const setAuthorIdSelector = (state) => state.authors.authorId;
