import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const TaskList = () => {
  const [tareas, setTareas] = useState([]);

  const cargarTareas = async () => {
    const res = await fetch("http://localhost:4000/tasks/");
    const data = await res.json();
    setTareas(data);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <>
      <h1>TaksList</h1>
      {tareas.map((tarea) => (
        <Card
          key={tarea.id}
          style={{
            marginBottom: ".7rem",
          }}
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Typography>{tarea.title}</Typography>
              <Typography>{tarea.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => console.log("edit")}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => console.log("delete")}
                style={{ marginLeft: ".5rem" }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
