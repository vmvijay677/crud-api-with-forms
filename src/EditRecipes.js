import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useHistory, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { API } from './API';
import { useFormik } from "formik";
import * as yup from "yup";
import { recipeValidationSchema } from "./AddRecipes";

export function EditRecipes() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`, {
      method: "GET",
    })
      .then((data) => data.json()) //response object
      .then((rcp) => setRecipes(rcp))
      .catch((err) => console.log(err));
  }, []);
  //console.log(recipes);
  return (
    <div>
      {recipes ? <EditRecipeForm recipes={recipes} /> : <h2 style={{ margin: "20px", fontSize: "35px" }}>Loading...</h2>}
    </div>
  );
}

function EditRecipeForm({ recipes }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      image: recipes.image,
      name: recipes.name,
      description: recipes.description,
      step1: recipes.step1,
      step2: recipes.step2,
      step3: recipes.step3,
      step4: recipes.step4,
      step5: recipes.step5,
      video: recipes.video
    },
    validationSchema: recipeValidationSchema,
    onSubmit: (updatedRecipe) => {
      //console.log("Onsubmit", values);
      editRecipe(updatedRecipe);
    },
  });

  const editRecipe = (updatedRecipe) => {
    //console.log("Updated", updatedRecipe);
    fetch(`${API}/${recipes.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedRecipe),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => history.push("/recipes"));
  }
  return (
    <div className='add-container'>
      <h1>Edit Recipe Steps & Methods</h1>
      <form onSubmit={formik.handleSubmit} className="add-movie-form">
        <TextField
          className="inputfield"
          label="Recipe Image"
          color="primary"
          variant="outlined"
          id="image"
          name="image"
          error={formik.touched.image && formik.errors.image}
          helperText={formik.touched.image && formik.errors.image ? formik.errors.image : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.image}
          onBlur={formik.handleBlur} />
        <TextField
          className="inputfield"
          label="Recipe Name"
          variant="outlined"
          color="primary"
          id="name"
          name="name"
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name ? formik.errors.name : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.name}
          onBlur={formik.handleBlur} />
        <TextField
          className="inputfield"
          label="Description"
          color="primary"
          variant="outlined"
          id="description"
          name="description"
          error={formik.touched.description && formik.errors.description}
          helperText={formik.touched.description && formik.errors.description ? formik.errors.description : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.description}
          onBlur={formik.handleBlur} />
        <TextField
          className="inputfield"
          label="Step-1"
          variant="outlined"
          color="primary"
          id="step1"
          name="step1"
          error={formik.touched.step1 && formik.errors.step1}
          helperText={formik.touched.step1 && formik.errors.step1 ? formik.errors.step1 : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.step1}
          onBlur={formik.handleBlur} />
        <TextField
          className="inputfield"
          label="Step-2"
          variant="outlined"
          color="primary"
          id="step2"
          name="step2"
          error={formik.touched.step2 && formik.errors.step2}
          helperText={formik.touched.step2 && formik.errors.step2 ? formik.errors.step2 : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.step2}
          onBlur={formik.handleBlur} />
        <TextField
          className="inputfield"
          label="Step-3"
          variant="outlined"
          color="primary"
          id="step3"
          name="step3"
          error={formik.touched.step3 && formik.errors.step3}
          helperText={formik.touched.step3 && formik.errors.step3 ? formik.errors.step3 : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.step3}
          onBlur={formik.handleBlur} />
        <TextField
          className="inputfield"
          label="Step-4"
          variant="outlined"
          color="primary"
          id="step4"
          name="step4"
          error={formik.touched.step4 && formik.errors.step4}
          helperText={formik.touched.step4 && formik.errors.step4 ? formik.errors.step4 : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.step4}
          onBlur={formik.handleBlur} />
        <TextField
          className="inputfield"
          label="Step-5"
          variant="outlined"
          color="primary"
          id="step5"
          name="step5"
          error={formik.touched.step5 && formik.errors.step5}
          helperText={formik.touched.step5 && formik.errors.step5 ? formik.errors.step5 : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.step5}
          onBlur={formik.handleBlur} />
        <TextField
          className="inputfield"
          label="Recipe Video"
          variant="outlined"
          color="primary"
          id="video"
          name="video"
          error={formik.touched.video && formik.errors.video}
          helperText={formik.touched.video && formik.errors.video ? formik.errors.video : " "}
          onChange={
            formik.handleChange
          }
          value={formik.values.video}
          onBlur={formik.handleBlur} />
        <p>
          <Button id="button" type="submit" variant="contained" color="success">Save</Button> &nbsp; &nbsp;
          <Button id="button" variant="contained" color="error" onClick={() => history.push("/recipes")}>Cancel</Button>
        </p>
      </form>
      <br></br>
      <br></br>
    </div>
  );
}
