import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProjectProvider } from "./context"; 
import ProjectsScreen from "./screens/Projectsscreen";
import TasksScreen from "./Screens/Tasksscreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TasksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tasks" component={TasksScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Projects" component={ProjectsScreen} />
          <Tab.Screen
            name="TasksTab"
            component={TasksStack}
            options={{ title: "Tasks" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ProjectProvider>
  );
}
