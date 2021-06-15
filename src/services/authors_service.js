import firebase from 'firebase/app';

export const createAuthor = async (data) => {

  data.createdAt = data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  data.books = [];
  return await firebase
    .firestore()
    .collection('authors')
    .where('name', '==', data.name)
    .get()
    .then(async (snapshot) => {
      if (snapshot.docs.length === 0) {
       
        const author = await firebase
          .firestore()
          .collection('authors')
          .add(data)
          .then((doc) => doc.id);
        return author;
      } else {
        throw Error();
      }
    });
};

export const readAuthor = (id) =>
  firebase
    .firestore()
    .collection('authors')
    .doc(id)
    .get()
    .then((doc) => doc.data());

export const updateAuthor = (id, updatedData) =>
  firebase
    .firestore()
    .collection('authors')
    .doc(id)
    .update({ ...updatedData, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });

export const deleteAuthor = async (id) => {
  const books = await firebase
    .firestore()
    .collection('authors')
    .doc(id)
    .get()
    .then((doc) => doc.data().books);

  if (books.length > 0) {
    for (let i = 0; i < books.length; i++) {
      const authors = await firebase
        .firestore()
        .collection('books')
        .doc(books[i])
        .get()
        .then((doc) => doc.data().authors);
      if (authors.length === 1) {
        await firebase.firestore().collection('books').doc(books[i]).delete();
      } else {
        await firebase
          .firestore()
          .collection('books')
          .doc(books[i])
          .update({
            authors: firebase.firestore.FieldValue.arrayRemove(id),
          });
      }
    }
  }
  firebase.firestore().collection('authors').doc(id).delete();
};
