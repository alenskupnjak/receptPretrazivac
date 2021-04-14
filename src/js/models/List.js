export default class List {
  constructor() {
    this.item = [];
  }

  addItem(count, unit, ingredient) {
    const namirnica = {
      id: Math.random().toString(),
      count: count,
      unit: unit,
      ingredient: ingredient,
    };
    // dodajem na listu svih namirnica
    this.item.push(namirnica);
    return namirnica;
  }

  deleteItem(id) {
    const index = this.item.findIndex((el) => el.id === id);
    // [2,4,8] splice(1, 2) -> returns [4, 8], original array is [2]
    // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]
    this.item.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.item.find((el) => el.id === id).count = newCount;
  }
}
