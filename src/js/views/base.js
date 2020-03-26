export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  listRecipe: document.querySelector('.results__list'),
  searchLoader: document.querySelector('.results'),
  searchResPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping__list')
  
}


//************************************** */
// SPINNER POCETAK
// iscrtavanje loadera na ekran
export const renderLoader = (parent) => {
  const loader = `
  <div class="loader">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `
  parent.insertAdjacentHTML("afterbegin",loader)
}


// brisanje spinnera sa ekrana
export const clearLoader = () => {
const loader = document.querySelector('.loader');
  if (loader) {
   loader.remove();
  }
}
// SPINER KRAJ ********************************