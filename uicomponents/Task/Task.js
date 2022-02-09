import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Touchable,
  TouchableNativeFeedback,
} from "react-native";
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutLeft,
  Layout,
} from "react-native-reanimated";

function Task(props) {
  const deleteAlert = () =>
    Alert.alert("Task", "Delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => props.delete(props.index) },
    ]);

  function toggle() {
    props.toggle(props.index);
  }

  return (
    <Animated.View
      entering={LightSpeedInLeft}
      layout={Layout.springify()}
      exiting={LightSpeedOutLeft}
    >
      <TouchableNativeFeedback onLongPress={deleteAlert}>
        <View style={props.completed ? styles.taskCompleted : styles.task}>
          <View style={styles.textContainer}>
            <Text style={props.completed ? styles.textCompleted : styles.text}>
              {props.text}
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggle}
            style={props.completed ? styles.checkBoxCompleted : styles.checkBox}
          ></TouchableOpacity>
        </View>
      </TouchableNativeFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  task: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 5,
  },

  taskCompleted: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 10,
  },

  text: {
    fontSize: 18,
    color: "#787878",
  },

  textCompleted: {
    fontSize: 18,
    color: "#a8a8a8",
    textDecorationLine: "line-through",
  },

  checkBox: {
    borderRadius: 5,
    width: 22,
    height: 22,
    marginLeft: "auto",
    backgroundColor: "#c9c9c9",
  },

  checkBoxCompleted: {
    borderRadius: 5,
    width: 22,
    height: 22,
    marginLeft: "auto",
    backgroundColor: "#bdd9c7",
  },
});

export default Task;
