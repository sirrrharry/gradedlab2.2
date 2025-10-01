import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import { ProjectContext } from "../context";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

export default function TasksScreen({ navigation }) {
  const { selectedProject } = useContext(ProjectContext);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!selectedProject) {
      navigation.navigate("Projects");
      return;
    }

   
    const unsub = onSnapshot(doc(db, "projects", selectedProject.id), (docSnap) => {
      if (docSnap.exists()) {
        setTasks(docSnap.data().tasks || []);
      } else {
        navigation.navigate("Projects");
      }
    });

    return () => unsub();
  }, [selectedProject]);

  const addTask = async () => {
    if (input.trim() === "") return;
    const newTasks = [...tasks, { id: Date.now().toString(), name: input }];
    await updateDoc(doc(db, "projects", selectedProject.id), { tasks: newTasks });
    setInput("");
  };

  const deleteTask = async (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    await updateDoc(doc(db, "projects", selectedProject.id), { tasks: newTasks });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        {selectedProject?.name} - Tasks
      </Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Add new task"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TouchableOpacity
        onPress={addTask}
        style={{ backgroundColor: "lightblue", padding: 10, marginBottom: 20 }}
      >
        <Text>Add Task</Text>
      </TouchableOpacity>

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
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
