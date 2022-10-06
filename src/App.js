import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskList } from "./componentes/TaskList";
import { TaskForm } from "./componentes/TaskForm";
import { Navbar } from "./componentes/Navbar";
import { Container } from "@mui/material";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
