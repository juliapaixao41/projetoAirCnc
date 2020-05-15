import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './style.css';
import api from '../../services/api';


export default function New({ history }){
    const [empresa, setCompany] = useState('');
    const [tecnologia, setTechs] = useState('');
    const [valor, setPrice] = useState('');
    const [imagem, setImagem] = useState(null);

    const preview = useMemo(() => {
        return imagem ? URL.createObjectURL(imagem) : null;
    }, [imagem])

     async function handleSubmit(event){
         event.preventDefault();


        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('imagem', imagem);
        data.append('empresa', empresa);
        data.append('tecnologia', tecnologia);
        data.append('valor', valor);


         await api.post('/spots', data, {
            headers: { user_id }
        })
        
        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="imagem" 
                style={{backgroundImage: `url(${preview})`}}
                className="{imagem ? 'has-imagem' : ''}"
            
            >
                <input type="file" onChange={event => setImagem(event.target.files[0])}/>
                < img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="empresa">Empresa *</label>
                <input
                    id="empresa"
                    placeholder="Sua empresa incrivel"
                    value={empresa}
                    onChange={event => setCompany(event.target.value)}
                /> 

            <label htmlFor="tecnologia">Tecnologias * <span>(separadas por vírgula)</span></label>
                <input
                    id="tecnologia"
                    placeholder="Quais tecnologia usam?"
                    value={tecnologia}
                    onChange={event => setTechs(event.target.value)}
                /> 
            <label htmlFor="valor">Valor da diária * <span>(em branco para gratuito)</span></label>
                <input
                    id="valor"
                    placeholder="Valor cobrado por dia"
                    value={valor}
                    onChange={event => setPrice(event.target.value)}
                /> 

            <button type="submit" className="btn">Cadastrar</button>


        </form>
    )
}