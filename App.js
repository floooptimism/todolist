import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  UIManager,
  LayoutAnimation,
  Touchable,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Check from "./check.svg";
import Task from "./uicomponents/Task/Task";

// Layout animation flag
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const [tasks, setTasks] = useState([
    ["Currently, there is no persistent storage.", false],
    ["Add new task using the button above.", false],
    ["Long press on the task to delete it.", false],
    ["Tap the little box to mark it as completed.", false],
 
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  function toggleTask(index) {
    const newTasks = [...tasks];
    newTasks[index][1] = !newTasks[index][1];
    setTasks(newTasks);
  }

  function deleteTask(index) {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  function addTask(string){
    const newTasks = [...tasks];
    newTasks.push([string, false]);
    setTasks(newTasks);
    setModalVisible(false);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        {/* modal */}
        <AddTaskModal onClose={() => setModalVisible(false)} visible={modalVisible} onAddTask={addTask}/>

        {/* Headear */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Tasks</Text>
        </View>

        {/* addtask */}
        <AddTaskButton onPress={() => setModalVisible(true)}/>

        {/* Task container */}
        <View style={styles.taskContainer}>
          {tasks.map((task, index) => {
            return (
              <Task
                text={task[0]}
                key={index}
                completed={task[1]}
                index={index}
                toggle={toggleTask}
                delete={deleteTask}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

function AddTaskButton(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={addTaskButtonStyles.container}>
        <Text style={addTaskButtonStyles.text}>Add Task</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function AddTaskModal(props) {
  const [text, setText] = useState('');

  function addTask(){
    if(text.trim() == ''){
      return;
    }
    props.onAddTask(text);
  }

  return (
    <Modal onRequestClose={props.onClose} animationType="slide" visible={props.visible} transparent={false}>
      <View style={modalStyles.modalContainer}>

        {/* Go back button */}
        <TouchableOpacity onPress={props.onClose}>
          <Text style={modalStyles.goBackButton}>Go Back</Text>
        </TouchableOpacity>

        <Text style={modalStyles.inputLabel}>Task</Text>
        <TextInput onChangeText={setText} placeholder="Task description" style={modalStyles.textInput} multiline editable numberOfLines={4} />
        
        <View style={modalStyles.button}>
          <Button onPress={addTask} title="Add Task" color={"#779dc9"}/>
        </View>
     
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  modalContainer: {
    padding: 10,
    paddingHorizontal: 15,
    marginTop: 20
  },

  inputLabel: {
    marginTop: 30,
    paddingVertical: 5,
    fontSize: 28,
    color: '#757575'
  },

  goBackButton:{
    color: '#757575',
    textDecorationLine: 'underline',
    textDecorationColor: '#757575',
  },  

  textInput: {
    marginTop: 5,
    padding: 10,
    textAlignVertical: 'top',
    borderWidth: 1,
    backgroundColor: "#f7f7f7",
    borderColor: "#ebebeb",
    borderRadius: 10,
    color: '#737373',
    fontSize: 18
  },

  button: {
    marginTop: 20,
  }

});

const addTaskButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: 120,
    paddingVertical: 8,
    borderRadius: 7,
    borderStyle: "dashed",
    borderColor: "#868687",
    borderWidth: 1,
  },

  text: {
    fontWeight: "500",
    fontSize: 16,
    color: "#737373",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  subContainer: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  headerText: {
    color: "#000",
    fontSize: 24,
  },

  taskContainer: {
    marginTop: 30,
    flex: 4,
    paddingHorizontal: 10,
    width: "100%",
  },
});
