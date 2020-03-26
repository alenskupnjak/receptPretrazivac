import { elements } from './base';

export const getInput = () => {
  return elements.searchInput.value;
};


// setiranje ulazne vrijednosti
export const clearInput = () => {
  elements.searchInput.value = 'pasta';
};


// brisanje ubacenih elemenata sa stranica
export const clearResults = () => {
  elements.listRecipe.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};


// limitiranje zapisa TITLR na odredeni vroj znakova (limit)
const limitRecipeTitle = (title, limit = 17) => {
  if (title.length < limit) return title;
  let newTitle = [];
  let brojac = 0;
  title.split(' ').forEach((element, index) => {
    if (brojac + element.length <= limit) {
      brojac += element.length + 1;
      newTitle.push(element);
    }
  });
  return newTitle.join(' ') + ' ...';
};


// setiranje HTML template za ubacivanje na strnicu
const renderRecipe = data => {
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
  elements.listRecipe.insertAdjacentHTML('beforeend', markup);
};


// postavljanje stranice koja se ispisuje
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const startStranica = (page - 1) * resPerPage;
  const endStranica = page * resPerPage;
  recipes.slice(startStranica, endStranica).forEach(element => {
    renderRecipe(element);
  });
  renderButtons(page, recipes.length, resPerPage);
};


// kreiranje HTML template za ubacivanje na stranicu
const createButton = (page, type) => {
  let buttton = `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            type === 'prev' ? 'left' : 'right'
          }"></use>
      </svg>
  </button>`;
  return buttton;
};




// postavljanje vrijednosti buttona PREV i NEXT
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // ako je prva stranica, a ima više stranica prikazuje samo NEXT 2->
    button = createButton(page, 'next');
  } else if (page < pages) {
    // ako je na npr. 2 stranici od 4 formira 2 buttona  <- PREV   NEXT->
    button = `
    ${createButton(page, 'prev')}
    ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    // ako je ZADNJA stranica, a ima više stranica prikazuje samo <- PREV
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};
