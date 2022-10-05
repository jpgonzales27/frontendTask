import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskList } from "./componentes/TaskList";
import { TaskForm } from "./componentes/TaskForm";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
