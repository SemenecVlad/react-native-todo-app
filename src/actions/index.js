import { AUTH_SUCCESS, ADD_TODO, FETCH_TODOS, DELETE_TODO } from "./types";
import { AsyncStorage } from "react-native";
import firebase from "firebase";
import { reset } from "redux-form";

export function logIn({ email, password }) {
  return function(dispatch) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        AsyncStorage.setItem("token", response.refreshToken);
        AsyncStorage.setItem("uid", response.uid);
        let token = response.refreshToken;
        // console.log(AsyncStorage.getItem("token"));
        console.log("Your Token ", token);

        dispatch({
          type: AUTH_SUCCESS,
          payload: token
        });
      })
      .catch(e => {
        console.log(e.message);
      });
  };
}

export function addTodo({ task }) {
  const { currentUser } = firebase.auth();
  return function(dispatch) {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos`)
      .push({
        task: task,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        completed: false,
        id: Date.now()
      })
      .then(() => {
        dispatch({
          type: ADD_TODO
        });
      }, dispatch(reset("todo")));
  };
}

export function deleteTodo(key) {
  return function(dispatch) {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos/${key}`)
      .remove()
      .then(
        dispatch({
          type: DELETE_TODO,
          payload: key
        })
      );
  };
}

export function fetchTodos() {
  const { currentUser } = firebase.auth();
  return function(dispatch) {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/todos`)
      .on("value", snapshot => {
        dispatch({
          type: FETCH_TODOS,
          payload: snapshot.val()
        }),
          console.log("fetch", snapshot.val());
      });
  };
}
