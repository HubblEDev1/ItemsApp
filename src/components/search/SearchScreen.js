import React, { useMemo } from 'react'
import { useLocation } from 'react-router';
import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm/useForm';
import { HeroCard } from '../heroes/HeroCard';
import queryString from 'query-string';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    //console.log(location.search);
    const { q = '' } = queryString.parse(location.search);

    const [{hero}, handleInputChange, reset] = useForm({
        hero: q
    });


    const heroesFiltered = useMemo(() => getHeroesByName( q ), [q]);  

    const handleSearch = (e) => {
        e.preventDefault();
        if( hero.trim().length <= 1){
            return;
        }

        history.push(`?q=${hero}`)
    
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <hr/>
                    <form onSubmit={handleSearch}> 
                        <input
                            type="text"
                            name="hero"
                            placeholder="Find your hero"
                            className="form-control"
                            onChange={handleInputChange}
                            value={hero}
                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4> Results </h4>
                    <hr/>
                    
                    {
                        (q === '')
                            && 
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                            && 
                            <div className="alert alert-danger">
                                There isn't a hero with {q}
                            </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
                
            </div>
        </div>
    )
}
