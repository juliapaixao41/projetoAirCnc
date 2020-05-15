import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import './style.css';
import { Link} from 'react-router-dom'


export default function Dashboard(){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        //busca inicial de dados da api
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            console.log(response.data)
            setSpots(response.data);

        }
        loadSpots();
    }, []);
    return (
        <> 
            <ul className="spot-list">
                {spots.map(spot => (
                  <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.imagem_url})`}}/>
                    <strong>{spot.empresa}</strong>
                    <span>{spot.valor ? `R$${spot.valor}/dia` : `GRATUITO` }</span>
                      
                  </li>  
                ))}

            </ul>

            <Link to="/new">
                <button className="btn"> Cadastrar novo spot</button>
            </Link>
        </>
    )
}