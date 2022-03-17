import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { API } from './API';

export function RecipeMethod() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    fetch(`${API}/${id}`, {
      method: "GET",
    })
      .then((data) => data.json()) //response object
      .then((rcp) => setRecipes(rcp))
      .catch((err) => console.log(err));
  }, []);

  const history = useHistory();
  return (
    <div>
      <iframe width="100%" height="650" src={recipes.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div className='method-counter'>
        <h2 className="details-name">{recipes.name}</h2>
        <p className="details-description">{recipes.description}</p>
        {recipes.step1 ? <p className='steps'><b>Step-1:</b> {recipes.step1}</p> : " "}
        {recipes.step2 ? <p className='steps'><b>Step-2:</b> {recipes.step2}</p> : " "}
        {recipes.step3 ? <p className='steps'><b>Step-3:</b> {recipes.step3}</p> : " "}
        {recipes.step4 ? <p className='steps'><b>Step-4:</b> {recipes.step4}</p> : " "}
        {recipes.step5 ? <p className='steps'><b>Step-5:</b> {recipes.step5}</p> : " "}
      </div>
      <Button style={{ margin: "15px" }} variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => { history.goBack(); }}>
        Back
      </Button>
    </div>
  );
}
