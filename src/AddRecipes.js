import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useHistory, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { API } from './API';
import { useFormik } from "formik";
import * as yup from "yup";

export const recipeValidationSchema = yup.object({
  image: yup
    .string()
    .required("Why not fill this image link?")
    .min(10, "Need a longer link"),
  name: yup
    .string()
    .required("Why not fill this name?")
    .min(5, "Need a longer name"),
  description: yup
    .string()
    .required("Why not fill this description?")
    .min(20, "Need a longer description"),
  step1: yup
    .string()
    .required("Kindly fill this Step-1!")
    .min(10, "Need a longer step-1"),
  step2: yup
    .string()
    .required("Kindly fill this Step-2!")
    .min(10, "Need a longer step-2"),
  step3: yup
    .string()
    .required("Kindly fill this Step-3!")
    .min(10, "Need a longer step-3"),
  step4: yup
    .string()
    .required("Kindly fill this Step-4!")
    .min(10, "Need a longer step-4"),
  step5: yup
    .string()
    .required("Kindly fill this Step-5!")
    .min(10, "Need a longer step-5"),
  video: yup
    .string()
    .required("Why not fill this video link?")
    .min(10, "Need a longer step-5"),
});

export function AddRecipes() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      description: "",
      step1: "",
      step2: "",
      step3: "",
      step4: "",
      step5: "",
      video: ""
    },
    validationSchema: recipeValidationSchema,
    onSubmit: (newRecipe) => {
      //console.log("Onsubmit", values);
      addRecipe(newRecipe);
    },
  });

  const addRecipe = (newRecipe) => {
    //console.log("Onsubmit", values);
    fetch(`${API}`, {
      method: "POST",
      body: JSON.stringify(newRecipe),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => history.push("/recipes"));
  }
  return (
    <div className='add-container'>
      <h1>Add 5-Step Recipes & Method</h1>
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
          <Button id="button" type="submit" variant="contained" color="warning">Add Recipe</Button> &nbsp; &nbsp;
          <Button id="button" variant="contained" color="error" onClick={() => history.push("/recipes")}>Cancel</Button>
        </p>
      </form>
      <br></br>
      <br></br>
    </div>
  );
}
