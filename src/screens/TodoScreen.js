import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";

import TodoForm from "../components/TodoForm";

class TodoScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <TodoForm />
      </View>
    );
  }
}

const styles = {
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 25
  }
};

export default connect(null, actions)(TodoScreen);
