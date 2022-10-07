import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const TaskForm = () => {
  const [tarea, setTarea] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tarea);

    setLoading(true);

    if (!editando) {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        body: JSON.stringify(tarea),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(tarea),
        headers: { "Content-Type": "application/json" },
      });
    }

    setLoading(false);
    navigate("/");
  };

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const buscarTarea = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json();
    // setTarea(data);
    setTarea({ title: data.title, description: data.description });
    setEditando(true);
  };

  useEffect(() => {
    console.log(params);
    if (params.id) {
      buscarTarea(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ padding: "1rem" }}>
          <Typography variant="5" textAlign="center">
            {editando ? "Editar Tarea" : "Crear Tarea"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name="title"
                variant="filled"
                label="Titulo"
                sx={{ display: "block", margin: ".5rem 0" }}
                onChange={handleChange}
                value={tarea.title}
              />
              <TextField
                name="description"
                variant="filled"
                label="Description"
                multiline
                rows={4}
                sx={{ display: "block", margin: ".5rem 0" }}
                onChange={handleChange}
                value={tarea.description}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!tarea.title || !tarea.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
