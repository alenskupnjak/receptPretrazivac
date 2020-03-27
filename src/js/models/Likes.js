export default class Likes {
    constructor() {
      this.likes= [];
    }


    addLike(id, title, author, img) {
      const like = { id:id, title: title, author: author, img:img }
      this.likes.push(like)

      // Spremi podatak u localstorage
      this.persistData();

      return like
    }

    deleteLike(id) {
        const index = this.likes.findIndex( el => el.id === id);
        this.likes.splice(index,1);

        // Spremi podatak u localstorage
        this.persistData();
    }


    isLiked(id) {
      // ako ga JE pronasao u listi lajkanja vraća TRUE
      let pronadi = this.likes.findIndex( el => {
        if ( el.id === id) {
          return id
        }
      });
      // nije pronasao u polju, vrijednost = -1
      if (pronadi === -1) {
        return false;
      } else {
        return true;
      }

      // return this.likes.findIndex( el=> el.id === id) !== -1
    }

    getNumLikes() {
      return this.likes.length;
    }

    persistData() {
      localStorage.setItem('likeStorage', JSON.stringify(this.likes));
    }

    readStorage() {
      const storage = JSON.parse(localStorage.getItem('likeStorage'));      
      // spremamo rezultate iz lokal storage
      if (storage) this.likes = storage;
    }

}