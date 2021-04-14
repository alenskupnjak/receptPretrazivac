import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      // https://forkify-api.herokuapp.com/api/get?&rId=47032
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredience() {
    // setiramo mjerne jedinice za pretvorbu jedinice
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds',
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound',
    ];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredience = this.ingredients.map((data) => {
      // 1. uniform units
      let ingredient = data.toLowerCase();

      // prolazimo kroz svaku namirnicu i mijenjamo vrijednosti prema unitsShort tablici
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      //2. mice textove u zagradama , zanemarujemo taj text
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3. rasčlanjivanje zapisa u polje koje mozemo obradivati
      const arrIng = ingredient.split(' ');

      // trazimo dali u zapisu ima jedinicu mjere i na kojem mjestu
      // const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
      let mjernaJedinica;
      const unitIndex = arrIng.findIndex((data, index) => {
        if (unitsShort.includes(data)) {
          mjernaJedinica = arrIng[index];
        }
        return unitsShort.includes(data);
      });

      let objIng;
      if (unitIndex > -1) {
        // stvara polje od broj zapisa brojeva u nizu rijesavamo slucaj npr.: 1 1/4
        // primjer. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
        // primjer. 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          // ako se pojavio slučak 1-1/4 mijenjamo - u +
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count: count,
          unit: mjernaJedinica,
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // ako je prvi zapis broj, moguce je pretvoriti to konverzija broja vraca vrijednost TRUE
        // nema jedinice mjere u zapisu, ali je prvi zapis broj
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          // preskacemo prvi zapis, i od [1] stvaramo novo polje
          ingredient: arrIng.slice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        // nema nijedne jedinice
        objIng = {
          count: 1,
          unit: '',
          ingredient: ingredient,
        };
      }

      return objIng;
    });

    this.ingredients = newIngredience;
  }

  // promjena količina
  updateServising(type) {
    // servisnig
    const newServising = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // preračunavamo potrebne namirnice
    this.ingredients.forEach((ing) => {
      ing.count = ing.count * (newServising / this.servings);
    });
    this.servings = newServising;
  }
}
