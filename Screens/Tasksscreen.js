import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, Alert } from "react-native";
import { ProjectContext } from "../context";
import { db } from "../firebase"; 
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function TasksScreen({ navigation }) {
  const { selectedProject, setSelectedProject } = useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!selectedProject) return;

    const projectRef = doc(db, "projects", selectedProject.id);

    const unsubscribe = onSnapshot(projectRef, (docSnap) => {
      if (!docSnap.exists()) {
        Alert.alert("Project deleted", "This project was deleted.");
        setSelectedProject(null);
        navigation.navigate("Projects");
        return;
      }
      const data = docSnap.data();
      setTasks(data.tasks || []);
    });

    return () => unsubscribe();
  }, [selectedProject]);

  const addTask = async () => {
    if (newTask.trim() === "") return;

    const projectRef = doc(db, "projects", selectedProject.id);
    await updateDoc(projectRef, {
      tasks: arrayUnion({ id: Date.now().toString(), title: newTask }),
    });
    setNewTask("");
  };

  const deleteTask = async (task) => {
    const projectRef = doc(db, "projects", selectedProject.id);
    await updateDoc(projectRef, {
      tasks: arrayRemove(task),
    });
  };

  if (!selectedProject) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No project selected</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {tasks.length === 0 && <Text>No tasks found for this project.</Text>}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              borderBottomWidth: 1,
            }}
          >
            <Text>{item.title}</Text>
            <Button title="Delete" onPress={() => deleteTask(item)} color="red" />
          </View>
        )}
      />

      <TextInput
        placeholder="New Task"
        value={newTask}
        onChangeText={setNewTask}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
}
