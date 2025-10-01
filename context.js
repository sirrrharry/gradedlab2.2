import React, { createContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { onSnapshot, collection, doc } from "firebase/firestore";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);


  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (selectedProject && !projects.find((p) => p.id === selectedProject.id)) {
      setSelectedProject(null);
    }
  }, [projects]);

  return (
    <ProjectContext.Provider value={{ projects, selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
