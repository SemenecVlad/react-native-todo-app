import React, { Component } from "react";
import { View, Text, Dimensions, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";

import AuthForm from "../components/AuthForm";

class AuthScreen extends Component {
  componentWillMount() {
    if (this.props.token) {
      this.props.navigation.navigate("main");
    }
    // let uid = AsyncStorage.getItem("uid").then(value => {
    //   JSON.parse(value);
    // });
    // console.log(uidVal);
  }
  logInWithEmail = ({ email, password }) => {
    this.props.logIn({ email, password });
    this.props.navigation.navigate("main");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <AuthForm onLogin={this.logInWithEmail} />
      </View>
    );
  }
}

const styles = {
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25
  }
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, actions)(AuthScreen);
