import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API } from './API';
import { Recipes } from "./Recipes";

export function RecipeList() {
  const history = useHistory();
  const [recipeList, setRecipeList] = useState([]);

  const getRecipes = () => {
    fetch(`${API}`, {
      method: "GET",
    }) //promise
      .then((data) => data.json())
      .then((rcp) => setRecipeList(rcp));
  };

  useEffect(() => getRecipes(), []);
  //delete recipes -> refresh data
  const deleteRecipe = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    })
      .then(() => getRecipes());
  };
  return (
    <div className="App">
      {recipeList.map(({ image, name, description, step1, step2, step3, step4, step5, deleteButton, editButton, id }, index) => <Recipes
        image={image}
        name={name}
        description={description}
        step1={step1}
        step2={step2}
        step3={step3}
        step4={step4}
        step5={step5}
        deleteButton={<Button id="button" variant="contained" color="error" onClick={() => deleteRecipe(id)}>Delete &nbsp;<DeleteIcon /></Button>}
        editButton={<Button id="button" variant="contained" color="success"
          onClick={() => {
            //console.log(index);
            history.push(`/recipes/edit/${id}`);
          }}>Edit &nbsp;<EditIcon /></Button>}
        id={id} />)}
    </div>
  );
}
