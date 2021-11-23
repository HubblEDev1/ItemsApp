import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { heroImages } from '../../helpers/heroImages';
import { AppRouter } from '../../routers/AppRouter'
import { getHeroeById } from '../../selectors/getHeroById';
// import batman from '../../assets/heroes/dc-batman.jpg';

export const HeroeScreen = ({history}) => {
    
    //const p = useParams();//Allow us to extract URL's params
    //console.log(p);
    const { heroeId } = useParams();
    //const hero = getHeroeById(heroeId); 
    const hero = useMemo(() => getHeroeById(heroeId), [heroeId]);

    if( !hero ){
        return <Redirect to='/'/>;
    }

    const {
        id, 
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters   
    } = hero;

    const handleReturn = () => {
        console.log('hola')
        if(history.length <= 2){
            history.push('/');
        }else{
            history.goBack();
        }
    }

    return (
        <div className="row mt-5">
            <div className = "col-4">
                <img
                    // src={`../assets/heroes/${heroeId}.jpg`} from public/aasets 
                    //src={batman} // using import
                    src={heroImages(`./${heroeId}.jpg`).default}
                    alt={superhero}
                    className="img-thumbnail"
                />
            </div>
            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b> {alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b> {publisher}</li>
                    <li className="list-group-item"><b>First appearance: </b> {first_appearance}</li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button 
                    className="btn btn-outline-info"
                    onClick={handleReturn}
                >
                    Go back
                </button>

            </div>
            
        </div>
    )
}
