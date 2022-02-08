import { heroes } from "../data/heroes";

export const getHeroeByName = (name ='') => {
    if( name.length === 0 ){
        return [];
    }    
    name = name.toLowerCase();
    return heroes.filter(hero => hero.superhero.toLowerCase().includes(name));
}