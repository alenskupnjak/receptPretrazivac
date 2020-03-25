import { elements } from './base';



export const getInput = () => {
  return elements.searchInput.value;
};



export const clearInput = () => {
  elements.searchInput.value = 'pasta'
}



export const clearResults = () => {
  elements.listRecipe.innerHTML= "";
  elements.searchResPages.innerHTML="";
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



const createButton = (page, type) =>{
 let buttton = `<button class="btn-inline results__btn--${type}" data-goto=${type ==='prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type ==='prev' ? 'left' : 'right'}"></use>
      </svg>
  </button>`;
return buttton;

}



const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages){
    // both button
    button = `
    ${createButton(page, 'prev')}
    ${createButton(page, 'next')}
    `;
  } else if (page === pages  && pages > 1) {
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}



export const renderResults = (recipes, page= 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(element => {
    renderRecipe(element);
  });
  renderButtons(page, recipes.length, resPerPage );
};
