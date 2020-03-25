import Search from './models/Search';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */


const state = {};


/*
* SEARCH CONTROLER
*/
const controlSearch = async () => {
   // 1) Get query from view
   const query = searchView.getInput();
   console.log(query)

   if (query) {
      // 2) New search object and add to state
     state.search = new Search(query);

      // 3) Prepare UI for results
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchLoader);

      // 4) Search for recipes
      await state.search.getResults();
      
      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result)
   
   }
};


// ovdije zapocinjemo sa programom
  elements.searchForm.addEventListener('submit', e => {
  // sprečavamo da se stranica sama radi refres
  e.preventDefault();
  controlSearch();
})

elements.searchResPages.addEventListener('click', e=>{
   const btn = e.target.closest('.btn-inline');
   if (btn) {
      const gotoPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, gotoPage)
   }

})


/*
* RECIPE CONTROLER
*/
const r = new Recipe(46956)
r.getRecipe();
console.log(r)


