import Expo from "expo";
import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { TabNavigator } from "react-navigation";
import firebase from "firebase";
import store from "./src/store";
import config from "./config";

import AuthScreen from "./src/screens/AuthScreen";
import TodoScreen from "./src/screens/TodoScreen";

export default class App extends React.Component {
  componentDidMount() {
    firebase.initializeApp(config);
  }
  render() {
    const MainNavigator = TabNavigator(
      {
        auth: {
          screen: AuthScreen
        },
        main: {
          screen: TodoScreen
        }
      },
      {
        initialRouteName: "auth",
        tabBarPosition: "bottom",
        navigationOptions: {
          tabBarVisible: false
        },
        swipeEnabled: false
        // animationEnabled: false
      }
    );
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator style={{ width: Dimensions.get("window").width }} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: "center",
    // justifyContent: "center"
    // marginTop: 25
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
