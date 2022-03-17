import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import Heart from "react-heart"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import VisibilityIcon from '@mui/icons-material/Visibility';


export function Recipes({ image, name, description, step1, step2, step3, step4, step5, deleteButton, editButton, id }) {
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [active, setActive] = useState(false)
  return (
    <Card className='details-counter'>
      <div>
        <img className="recipe-image" src={image}></img>
        <CardContent>
          <div className="name-heart">
          <h2 className='recipe-name'>{name}
            <IconButton color="warning" aria-label="recipe-description" onClick={() => setShow(!show)}>
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton></h2>
          <Heart style={{ width: "1.5rem" }} isActive={active} onClick={() => setActive(!active)} />
          </div>
          {show ? <p className='description'>{description}</p> : " "}
          <br></br>
        </CardContent>
        <CardActions>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<Button id="button" variant="contained" color="primary" onClick={() => history.push(`/recipe/methodandsteps/${id}`)}>View &nbsp; <VisibilityIcon /></Button>
          {editButton}
          {deleteButton}
        </CardActions>
        <br></br>
      </div>
    </Card>
  );
}
