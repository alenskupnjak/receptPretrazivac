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


const renderRecipe = (data) => {
  const markup = `
    <li>
      <a class="results__link results__link--active" href="#${data.recipe_id}">
          <figure class="results__fig">
              <img src="${data.image_url}" alt="${data.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${data.title}</h4>
              <p class="results__author">${data.publisher}</p>
          </div>
      </a>
    </li>
  `;
  elements.listRecipe.insertAdjacentHTML("beforeend",markup);
};


export const renderResults = (recipes) => {
  recipes.forEach(element => {
    renderRecipe(element);
  });
};
