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
import { useNavigate } from "react-router-dom";

export const TaskForm = () => {
  const [tarea, setTarea] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tarea);

    setLoading(true);

    //Usando fetch enviamos nuestra tarea al endpoint deseado
    const res = await fetch("http://localhost:4000/tasks", {
      //definimos el metodo de la peticion
      method: "POST",
      //debemos converitir nuestro objeto a string
      body: JSON.stringify(tarea),
      //definimos el formato para que la app entienda que le enviamos un JSON
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);

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
            Crear Tarea
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name="title"
                variant="filled"
                label="Titulo"
                sx={{ display: "block", margin: ".5rem 0" }}
                onChange={handleChange}
              />
              <TextField
                name="description"
                variant="filled"
                label="Description"
                multiline
                rows={4}
                sx={{ display: "block", margin: ".5rem 0" }}
                onChange={handleChange}
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
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
