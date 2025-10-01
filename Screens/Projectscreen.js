import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProjectContext } from "../context";

export default function ProjectsScreen() {
  const { projects, setSelectedProject } = useContext(ProjectContext);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 15, borderBottomWidth: 1 }}
            onPress={() => {
              setSelectedProject(item);
              navigation.navigate("Tasks");
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>{item.tasks?.length || 0} tasks</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
