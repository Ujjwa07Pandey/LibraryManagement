import firebase from 'firebase/app';

export const signUpWithEmailAndPassword = async (data) => {
  const { user } = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
  delete data.password;
  data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  firebase.firestore().collection('users').doc(user.uid).set(data);
};
export const signInWithEmailAndPassword = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

export const signOut = () => firebase.auth().signOut();

export const forgotPassword = (email) => firebase.auth().sendPasswordResetEmail(email);
