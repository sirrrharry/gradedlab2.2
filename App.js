import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProjectProvider } from "./context";
import ProjectsScreen from "./screens/ProjectScreen";
import TasksScreen from "./screens/TasksScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TasksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={TasksStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </ProjectProvider>
  );
}
