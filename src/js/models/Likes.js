export default class Likes {
    constructor(){
      this.likes= [];
    }


    addLike(id, title, author, img) {
      const like = { id:id, title: title, author: author, img:img }
      this.likes.push(like)
      return like
    }

    deleteLike(id){
        const index = this.likes.findIndex( el => el.id === id);
        this.likes.splice(index,1);
    }


    isLiked(id) {
      // ako ga JE pronasao u listi lajkanja vraća TRUE
      let pronadi = this.likes.findIndex( el => {
        if ( el.id === id) {
          return id
        }
      });
      
      if (pronadi === -1) {
        return false;
      } else {
        return true;
      }

      // return this.likes.findIndex( el=> el.id === id) !== -1
    }

    getNumLikes (){
      return this.likes.length;
    }

}