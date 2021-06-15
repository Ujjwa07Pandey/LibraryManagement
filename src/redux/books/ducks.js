const INITIAL_STATE = {
    book:null,
    setAction: null,
    bookId:null,
    
  };
  
  export const BookActionTypes = {
    ADD_BOOK: 'ADD_BOOK',
    READ_BOOK: 'READ_BOOK',
    UPDATE_BOOK: 'UPDATE_BOOK',
    DELETE_BOOK: 'DELETE_BOOK',
  
    SET_BOOK: 'SET_BOOK',
    SET_ACTION: 'SET_ACTION',
    SET_BOOK_ID: 'SET_BOOK_ID',
    
  };
  
  export const addBook = (data) => ({ type: BookActionTypes.ADD_BOOK, payload: { data } });
  export const readBook = (id) => ({ type: BookActionTypes.READ_BOOK, payload: { id } });
  export const updateBook = (id, data) => ({ type: BookActionTypes.UPDATE_BOOK, payload: { id, data } });
  export const deleteBook = (id) => ({ type: BookActionTypes.DELETE_BOOK, payload: { id } });
  export const setBookNull = () => ({ type: BookActionTypes.SET_BOOK, payload: { book:null , bookId:null} });
  export const setAction = (value) => ({ type: BookActionTypes.SET_ACTION, payload: { value } });
  export const setBookId = (id) => ({type:BookActionTypes.SET_BOOK_ID, payload:{id}});
  
  
  export const booksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case BookActionTypes.ADD_BOOK:
      case BookActionTypes.UPDATE_BOOK:
      case BookActionTypes.DELETE_BOOK:
    
        return state;
      case BookActionTypes.SET_BOOK_ID:
        return {...state , bookId: action.payload.id};
      case BookActionTypes.SET_BOOK:
        return { ...state, book: action.payload.book , bookId: action.payload.id};
      case BookActionTypes.SET_ACTION:
        return { ...state, setAction: action.payload.value };
      default:
        return state;
    }
  };
  
  export const setBookSelector = (state) => state.books.book;
  export const setActionSelector = (state) => state.books.setAction;
  export const setBookIdSelector = (state) => state.books.bookId;
  