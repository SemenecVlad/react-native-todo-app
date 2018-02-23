import React, { Component } from "react";
import { ScrollView, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import { Button, FormLabel } from "react-native-elements";

import MyTextInput from "./MyTextInput";

class AuthForm extends Component {
  componentWillMount() {}
  logInWithEmail = ({ email, password }) => {
    this.props.logIn({ email, password });
    this.props.navigation.navigate("main");
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <ScrollView style={styles.continer} keyboardShouldPersistTaps={"handled"}>
        <FormLabel>Email:</FormLabel>
        <Field
          placeholder="Email"
          keyboardType="email-address"
          type="text"
          name="email"
          component={MyTextInput}
        />
        <FormLabel>Password:</FormLabel>
        <Field
          secureTextEntry={true}
          placeholder="Password"
          type="password"
          name="password"
          component={MyTextInput}
        />
        <Button
          onPress={handleSubmit(this.props.onLogin)}
          title="Submit"
          icon={{ name: "envira", type: "font-awesome" }}
          buttonStyle={styles.buttonStyle}
        />
      </ScrollView>
    );
  }
}

const styles = {
  continer: {
    flex: 1
  },
  buttonStyle: {
    backgroundColor: "greenyellow",
    borderRadius: 5,
    marginTop: 15,
    padding: 20
  }
};

AuthForm = reduxForm({
  form: "signin"
})(AuthForm);

AuthForm = connect(null, actions)(AuthForm);

export default AuthForm;
