import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {

  const { id } = useParams();
  
  const hero = getHeroById(id);

  if(!hero){
    return <Navigate to="/" />
  }

  return(
      <div>
          <h1>Hero Screen</h1>
          <p>
            { hero.superhero }
          </p>
      </div>
  )
};
