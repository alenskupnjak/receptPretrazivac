import Search from './models/Search';
import  Recipe  from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

// definiramo stanje stranice, tu je pohranjeno trenutno stanje svih vrijednosti
const state = {};


/*
* SEARCH CONTROLER
*/
const controlSearch = async () => {
   // 1) Očitanje ulazne vrijednosti (pasta, pizza....)
   const query = searchView.getInput();

   if (query) {
      // 2) New search object and add to state
     state.search = new Search(query);

      // 3) Prepare UI for results
      searchView.clearInput();
      searchView.clearResults();

      //ubacen spinner
      renderLoader(elements.searchLoader);

      // 4)  povlačenje podataka se net-a
      await state.search.getResults();
      
      // 5) Render results on UI
      // obrisan spinner nakon ucitavanje podataka
      clearLoader();
      searchView.renderResults(state.search.result)
   }
};




/*
* RECIPE CONTROLER
*/

const controlRecipe = async () => {
   // povlačim podatak direkno sa stranice i dobivamo npr. #45873
   // let id = window.location.hash.replace('#','');
   let id = window.location.hash;
   
   // dobivamo podatak npr #45873, nama treba 45873, micemo hash
   id = id.replace('#','');
   
   if (id) {
      // Prepare UI for changes
      recipeView.clearRecipe();
      renderLoader(elements.recipe);

      // Highlight selected search item
      if (state.search) searchView.highlightSelected(id);

      // Create new recipe object
      state.recipe = new Recipe(id);
      
      // TESTIRANJE
      window.r = state.recipe;
      
      try {
         
         // Get recipe data and parse ingredients
         await state.recipe.getRecipe();
         
         // Calculate servings and time
         state.recipe.calcTime();
         state.recipe.calcServings();
         state.recipe.parseIngredience();
         // Render recipe
         clearLoader();
         recipeView.renderRecipe(state.recipe)
         console.log(state.recipe)
      } catch (err) {
         alert(err)
      }
      
      console.log('Stanje projekta');
      console.log(state)
   }
};



// EventListener pokretanje programa
  elements.searchForm.addEventListener('submit', e => {
  // sprečavamo da se stranica sama radi refres
  e.preventDefault();
  controlSearch();
});


// EventListener za <-PREV   NEXT->
elements.searchResPages.addEventListener('click', e=>{
   const btn = e.target.closest('.btn-inline');
   if (btn) {
      const gotoPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, gotoPage)
   }
});




// moze i ovako..
// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

// kontrolizanje 
elements.recipe.addEventListener('click', e => {
   console.log(e.target.matches('.btn-decrease, .btn-decrease *' ));
   
   if (e.target.matches('.btn-decrease, .btn-decrease *' )) {
         // Decrease button is clicked
         // mora bit najmanje jedna osoba...
         if(state.recipe.servings > 1){
            state.recipe.updateServising('dec');
            recipeView.updateServingsIngredients(state.recipe);
         }
      } else if (e.target.matches('.btn-increase, .btn-increase *')) {
         // Increase button is clicked
         state.recipe.updateServising('inc');
         recipeView.updateServingsIngredients(state.recipe);
      };
      console.log(state.recipe); 

});
