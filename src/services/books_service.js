import firebase from 'firebase/app';

export const createBook = async (data) => {
  data.createdAt = data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  data.authors = [];
  return await firebase
    .firestore()
    .collection('books')
    .where('name', '==', data.name)
    .get()
    .then(async (snapshot) => {
      if (snapshot.docs.length === 0) {
      
        const book = await firebase
          .firestore()
          .collection('books')
          .add(data)
          .then((doc) => doc.id);

        return book;
      } else {
        throw Error('Book Already Present');
      }
    });
};

export const readBook = (id) =>
  firebase
    .firestore()
    .collection('books')
    .doc(id)
    .get()
    .then((doc) => doc.data());

export const updateBook = (id, updatedData) =>
  firebase
    .firestore()
    .collection('books')
    .doc(id)
    .update({ ...updatedData, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });

export const deleteBook = async (id) => {
  const authors = await firebase
    .firestore()
    .collection('books')
    .doc(id)
    .get()
    .then((doc) => doc.data().authors);
 
  if (authors.length > 0) {
    for (let i = 0; i < authors.length; i++) {
     
        await firebase
          .firestore()
          .collection('authors')
          .doc(authors[i])
          .update({
            books: firebase.firestore.FieldValue.arrayRemove(id),
          });
      }
    
  }
  firebase.firestore().collection('books').doc(id).delete();
}


  
