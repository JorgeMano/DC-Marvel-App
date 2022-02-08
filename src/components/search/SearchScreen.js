import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from "../../hooks/useForm";
import { getHeroeByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  
  const [ formValues, handleInputChange ] = useForm({
    searchText: q,
  });
  
  const heroesFileted = useMemo( () => getHeroeByName( q ), [ q ]);


  const { searchText } = formValues;
  

  const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`?q=${ searchText }`)
  }

  return(
      <div>
          <h1>Search</h1>
          <hr />

          <div className='row'>
            <div className='col-5'>
              <h4>Formulario</h4>
              <hr />

              <form onSubmit={ handleSubmit }>
                <input 
                  type="text"
                  placeholder='Buscar héroe'
                  className='form-control'
                  name="searchText"
                  autoComplete='off'
                  value={ searchText }
                  onChange={ handleInputChange }
                />

                <button
                  type='submit'
                  className='btn btn-outline-primary mt-3'
                  onClick={ handleSubmit }
                >
                  Submit
                </button>
              </form>
            </div>
            <div className='col-7'>
              <h4>Resultados</h4>
              <hr />
              {
                (q === '')
                  ? <div className='alert alert-info'> Buscar un héroe </div>
                  : ( heroesFileted.length === 0 ) 
                    && <div className='alert alert-danger'> No hay resultados para: { q } </div>
              }


              {
                heroesFileted.map(hero => (
                  <HeroCard 
                    key={ hero.id }
                    { ...hero }
                  />
                ))

              }
            </div>
          </div>
      </div>   
  )
};
