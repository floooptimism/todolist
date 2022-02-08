import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, UIManager, LayoutAnimation } from 'react-native';
import Check from './check.svg';
import Task from './uicomponents/Task/Task';

// Layout animation flag
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}


export default function App() {
  const [tasks, setTasks] = useState([
    ["Task 1", false],
    ["Task 2", false],
    ["Task 3", false],
    ["Task 4", false],
    ["Task 5", false],
    ["Task 6", false],
  ]);

  function toggleTask(index){
    const newTasks = [...tasks];
    newTasks[index][1] = !newTasks[index][1];
    LayoutAnimation.easeInEaseOut();
    setTasks(newTasks);
  }

  function deleteTask(index){
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    LayoutAnimation.spring();
    setTasks(newTasks);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>

        {/* Headear */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Tasks</Text>
        </View>

        {/* Task container */}
        <View style={styles.taskContainer}>
          {
            tasks.map((task, index) => {
              return <Task text={task[0]} key={index} completed={task[1]} index={index} toggle={toggleTask} delete={deleteTask}/>
            })
          }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  subContainer: {
    flex: 1,    
    alignItems: 'center',
  },

  header: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  headerText: {
    color: "#000",
    fontSize: 24
  },

  taskContainer: {
    flex: 4,
    paddingHorizontal: 10,
    width: '100%',
  }



});
