import { elements } from './base';

export const getInput = () => {
  return elements.searchInput.value;
};


export const clearInput = () => {
  elements.searchInput.value = 'pasta'
}


export const clearResults = () => {
  elements.listRecipe.innerHTML= "";
}


const limitRecipeTitle = (title, limit = 17) => {
  if (title.length < limit) return title;
  let newTitle = [];
  let brojac = 0
  title.split(' ').forEach((element, index) => {
      if (brojac + element.length <= limit) {
        brojac += element.length + 1
        newTitle.push(element); 
      }
  });
   return newTitle.join(' ') +' ...'
}



const renderRecipe = (data) => {
  const markup = `
    <li>
      <a class="results__link" href="#${data.recipe_id}">
          <figure class="results__fig">
              <img src="${data.image_url}" alt="${data.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(data.title)}</h4>
              <p class="results__author">${data.publisher}</p>
          </div>
      </a>
    </li>
  `;
  limitRecipeTitle(data.title);
  elements.listRecipe.insertAdjacentHTML("beforeend",markup);
};


export const renderResults = (recipes) => {
  recipes.forEach(element => {
    renderRecipe(element);
  });
};
