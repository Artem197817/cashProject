export class LocalStorageUtil {

    static CategoryKey = 'category'

    static setCategory(value){
        localStorage.setItem(this.CategoryKey, value)
    }
    static getCategory(){
        return localStorage.getItem(this.CategoryKey);
    }

    static removeCategory(key){
        localStorage.removeItem(this.CategoryKey);
    }
}