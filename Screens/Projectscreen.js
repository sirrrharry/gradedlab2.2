import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ProjectContext } from "../context"; 

export default function ProjectsScreen({ navigation }) {
  const [projects, setProjects] = useState([]);
  const { setSelectedProject } = useContext(ProjectContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedProject(item);
              navigation.navigate("TasksTab");
            }}
            style={{ padding: 15, borderBottomWidth: 1 }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>{item.tasks?.length || 0} tasks</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
