import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

export const TaskForm = () => {
  const [tarea, setTarea] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tarea);
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
              <Button variant="contained" color="primary" type="submit">
                Guardar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
