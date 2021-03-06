import './index.css';
import { useState } from "react";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { RecipeList } from './RecipeList';
import { AddRecipes } from './AddRecipes';
import { EditRecipes } from './EditRecipes';
import { RecipeMethod } from './RecipeMethod';
import { NotFound } from './NotFound';

const recipes = [
  {
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F08%2F26232425%2F5896956.jpg&q=60",
    "name": "Walnut-Nutmeg Pumpkin Custards",
    "description": "Planning any parties for fall? Don't overlook this custard recipe--it's easy to assemble and will have your guests doling out the compliments! They'll love how the creamy pumpkin custard contrasts with the crunchy walnut, brown sugar and oat topping.",
    "step1": "Preheat oven to 350 degrees F. Coat eight 6-ounce ramekins with cooking spray. Place ramekins in two 2-quart square baking dishes.",
    "step2": "In a medium bowl, combine evaporated milk, pumpkin, eggs, maple syrup, egg product and vanilla. In a small bowl sift together 1/2 teaspoon of the ground nutmeg, the salt and allspice. Add spice mixture to the pumpkin mixture; beat with a wire whisk until well mixed.",
    "step3": "In the small bowl that contained the spice mixture, combine walnuts, oats, brown sugar and the remaining 1/4 teaspoon ground nutmeg. Add melted butter; stir just until combined.",
    "step4": "Divide pumpkin mixture evenly among the prepared ramekins. Place baking dishes on the oven rack. Pour enough boiling water into baking dishes to reach halfway up the sides of the ramekins. Bake 15 minutes. Carefully top each with about 1 tablespoon of the nut mixture. Bake 15 to 20 minutes more or until a knife inserted near centers comes out clean.",
    "step5": "Remove ramekins from water; cool on wire rack 30 minutes. Cover and chill 2 to 8 hours before serving. To serve, top with whipped dessert topping and, if desired, sprinkle with freshly grated nutmeg."
  },
  {
    "image": "https://www.chocolatemoosey.com/wp-content/uploads/2018/03/Small-Batch-Flourless-Chocolate-Cookies-photo-7639-720x720.jpg",
    "name": "Flourless Chocolate Cookies",
    "description": "These flourless cookies get their volume from whipped egg whites (like a meringue) instead of grains, making them gluten-free and melt-in-your-mouth delicious. A chocolate chip in each bite adds to the rich chocolate flavor.",
    "step1": "Preheat oven to 350 degrees F. Line 2 large baking sheets with parchment paper. Coat the paper with cooking spray.",
    "step2": "Combine confectioners' sugar, cocoa powder and salt in a medium bowl. Beat egg whites in a large mixing bowl with an electric mixer until soft peaks form. Add vanilla. Fold in the cocoa powder mixture with a rubber spatula until combined. Fold in chocolate chips (or chunks).",
    "step3": "Drop the batter by tablespoonfuls onto the prepared baking sheets, leaving about 2 inches between each cookie. Bake, one sheet at a time, until the cookies are just beginning to crack on top, 12 to 14 minutes. Let cool slightly on the pan before transferring to a wire rack to cool completely.",
    "step4": "",
    "step5": "",
  },
  {
    "image": "https://nibblenomad.com/wp-content/uploads/2020/05/MInt-CC-Nice-for-NN-2.jpg",
    "name": "Mint Chocolate Chip Nice Cream",
    "description": "This green-as-a-shamrock nice cream made with almond milk, coconut cream and bananas--is loosely inspired by the Shamrock McFlurry. Whip up this dairy-free dessert for St. Patrick's Day or anytime you're craving a minty treat. (To keep this recipe vegan, be sure to choose vegan chocolate chips.)",
    "step1": "Pour almond milk into ice cube trays; freeze until frozen, about 8 hours.",
    "step2": "Transfer the frozen almond milk cubes to a food processor. Add coconut cream, peppermint extract, green food coloring and bananas; process until smooth, about 2 minutes, scraping down the sides with a rubber spatula as needed.",
    "step3": "Add chocolate chunks to the food processor; pulse until the chocolate chunks are well distributed and slightly smaller in size, 10 to 15 pulses.",
    "step4": "Transfer the mixture to an airtight freezer-safe container; freeze until firm, about 30 minutes. Top each serving with chocolate chunks and mint sprigs, if desired.",
    "step5": ""
  },
  {
    "image": "https://i0.wp.com/brownedbutterblondie.com/wp-content/uploads/2019/06/Mini-Chocolate-Cheesecakes-BP-1-1.jpg?ssl=1",
    "name": "Chocolate Mini Cheesecakes",
    "description": "These individual cheesecakes are made with a reduced-fat vanilla wafer crust and and filled with reduced-fat cream cheese and chocolate. They make a perfect light dessert.",
    "step1": "Preheat oven to 350 degrees Fahrenheit. Line twelve 2-1/2-inch muffin cups with foil or paper bake cups. Place 1 wafer in the bottom of each muffin cup. Set aside.",
    "step2": "Beat both cream cheeses in a medium bowl with an electric mixer on medium speed for 30 seconds. Beat in chocolate, sugar, milk and vanilla until well combined. Stir in egg white. Stir in dried cherries (or apricots). Spoon filling into the prepared cups, filling each about 3/4 full.",
    "step3": "Bake about 20 minutes or until set. Cool in muffin pan on a wire rack for 5 minutes. (Centers may dip slightly as they cool.) Remove cheesecakes from pan. Cool on a wire rack for 1 hour. Cover and chill for 3 to 24 hours.",
    "step4": "If you like, garnish with chocolate curls and/or strawberries before serving.",
    "step5": ""
  },
  {
    "image": "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26232341/5606637.jpg",
    "name": "No-Oat Apple Crisp",
    "description": "This simple oatless apple crisp gets its sweet topping from white whole-wheat flour, dark brown sugar and butter. Any sweet, firm apple will work. Experiment and mix and match to find your favorite fruit combo.",
    "step1": "Preheat oven to 375 degrees F. Coat an 8-inch-square (or 2-quart) deep baking dish with cooking spray.",
    "step2": "Combine apples, 1/4 cup brown sugar, lemon juice, cinnamon and a pinch of salt in a large bowl. Toss to mix. Transfer to the prepared baking dish, cover with foil and bake for 30 minutes.",
    "step3": "Meanwhile, combine flour, the remaining 1/4 cup brown sugar and the remaining 1/8 teaspoon salt in the bowl of a food processor. Process to blend. Add butter and pulse until crumbly.",
    "step4": "Remove the foil from the baking dish and scatter the flour mixture evenly over the apples. Bake, uncovered, until the topping is browned and the apples are soft and bubbling, 30 to 35 minutes more. Let cool for at least 15 minutes before serving.",
    "step5": ""
  },
  {
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F08%2F26231152%2F3747059.jpg&q=60",
    "name": "Dark Fudgy Brownies",
    "description": "We like to use chocolate with 60-72% cacao content in these rich, fudgelike brownies, as it imparts a deeper, fuller flavor than less-chocolaty choices. Recipe by Nancy Baggett for EatingWell.",
    "step1": "Position rack in center of oven; preheat to 350 degrees F. Line an 8-inch-square baking pan with foil, letting it overhang on two opposing sides. Coat with cooking spray.",
    "step2": "Sift flour, confectioners' sugar and cocoa together into a small bowl. Combine the 3 ounces coarsely chopped chocolate and oil in a heavy medium saucepan; place over the lowest heat, stirring, until just melted and smooth, being very careful the chocolate does not overheat. Remove from the heat and stir in granulated sugar, corn syrup mixture, vanilla and salt until the sugar dissolves. Vigorously stir in egg until smoothly incorporated. Gently stir in the dry ingredients. Fold in the walnuts (if using) and the remaining 2 1/2 ounces chopped chocolate just until well blended. Turn out the batter into the pan, spreading evenly.",
    "step3": "Bake the brownies until almost firm in the center and a toothpick inserted comes out with some moist batter clinging to it, 20 to 24 minutes. Let cool completely on a wire rack, about 2 1/2 hours.",
    "step4": "Using the overhanging foil as handles, carefully lift the brownie slab from the pan. Peel the foil from the bottom; set the slab right-side up on a cutting board. Using a large, sharp knife, trim off any dry edges. Mark and then cut the slab crosswise into fifths and lengthwise into fourths. Wipe the blade with a damp cloth between cuts.",
    "step5": ""
  }
]

export default function App() {
  const history = useHistory();
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper className="background" style={{ borderRadius: "0px", minHeight: "150vh" }} elevation={3}>
        <div className="appbar">
          <AppBar position="static" style={mode === "light" ? {backgroundColor: "pink"} : {backgroundColor: "black"}}>
            <Toolbar>
              <Button color="inherit" onClick={() => history.push("/")}>Home</Button>
              <Button color="inherit" onClick={() => history.push("/recipes")}>Recipes</Button>
              <Button color="inherit" onClick={() => history.push("/recipes/add")}>Add Recipes</Button>
              <Button
                color="inherit"
                startIcon={theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                style={{ marginLeft: "auto" }}
                onClick={() => setMode(mode === "light" ? "dark" : "light")}>{mode === "light" ? "Dark" : "Light"}</Button>
            </Toolbar>
          </AppBar>
        </div>
        <Switch>
          <Route exact path="/">
            <h1 className="welcome">Welcome to 5-Step or Less Dessert Recipes</h1>
          </Route>

          <Route exact path="/recipes">
            <RecipeList />
          </Route>

          <Route exact path="/recipes/add">
            <AddRecipes />
          </Route>

          <Route exact path="/recipes/edit/:id">
            <EditRecipes />
          </Route>

          <Route exact path="/recipe/methodandsteps/:id">
            <RecipeMethod />
          </Route>

          <Route exact path="**">
            <NotFound />
          </Route>
        </Switch>
      </Paper>
    </ThemeProvider>
  );
};
