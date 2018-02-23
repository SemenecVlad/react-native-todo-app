import React, { Component } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { Button } from "react-native-elements";
import * as actions from "../actions";

import MyTextInput from "./MyTextInput";

class TodoForm extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }
  addTask = ({ task }) => {
    this.props.addTodo({ task });
    console.log(this.props.todos);
  };

  deleteTask = key => {
    this.props.deleteTodo(key);
  };
  _keyExtractor = (item, index) => item.id;

  renderTask = ({ item }) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          padding: 20,
          paddingLeft: 40,
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1
        }}
      >
        <Text style={{ flex: 5 }} key={item.id}>
          {item.task}
        </Text>
        <Button
          onPress={() => this.deleteTask(item.uid)}
          title="Delete"
          icon={{ name: "highlight-off", type: "material" }}
          buttonStyle={styles.deleteButton}
        />
      </View>
    );
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <View>
        <View
          style={{
            width: Dimensions.get("window").width,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Field
            component={MyTextInput}
            placeholder="Write your task here..."
            type="text"
            name="task"
            style={{ flex: 5 }}
          />
          <Button
            onPress={handleSubmit(this.addTask)}
            icon={{ name: "send", type: "material" }}
            buttonStyle={styles.addButtonStyle}
          />
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.todos}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderTask}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const todos = _.map(state.todos.todos, (val, uid) => {
    return { ...val, uid };
  });

  return { todos };
};

const styles = {
  addButtonStyle: {
    backgroundColor: "greenyellow",
    borderRadius: 5,
    // marginTop: 15,
    padding: 5,
    flex: 3
  },
  deleteButton: {
    backgroundColor: "red",
    // width: 60,
    padding: 5,
    borderRadius: 5,
    flexGrow: 2,
    height: 40
  }
};

TodoForm = reduxForm({
  form: "todo"
})(TodoForm);

TodoForm = connect(mapStateToProps, actions)(TodoForm);

export default TodoForm;
