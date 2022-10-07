import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TaskList = () => {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();

  const cargarTareas = async () => {
    const res = await fetch("http://localhost:4000/tasks/");
    const data = await res.json();
    setTareas(data);
  };

  const elimiarTarea = async (id) => {
    //como nuestro backend no devuelve un json no es necesario
    // alamacenarlo y convertir la data de la tarea

    //? si devolviera algo esta seria la solucion
    // const res = await fetch(`http://localhost:4000/tasks/${id}`, {
    //   method: "DELETE",
    // });
    // const data = await res.json();
    // console.log(data);

    try {
      //*elimina en la BD
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });

      //*debemos eliminar en la UI
      const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
      setTareas(tareasActualizadas);
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (id) => {};

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
                onClick={() => navigate(`/tasks/${tarea.id}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => elimiarTarea(tarea.id)}
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
