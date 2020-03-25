import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();


  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('/ongs', data);

      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/')
    }catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
    
  } 

  function uppercase(str) {
    var array1 = str.split(' ');
    var newarray1 = [];
      
    for(var x = 0; x < array1.length; x++){
        newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
    }
    return newarray1.join(' ');
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o logon
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
           placeholder="Nome da ONG"
           value={name}
           onChange={e => setName(e.target.value)}
           />
          <input 
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
           />
            
          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              autoCapitalize="words"
              onChange={e => setCity(uppercase(e.target.value))}
            />
            <input
              placeholder="UF"
              style={{width: 80}}
              value={uf}
              onChange={e => setUf(e.target.value.toUpperCase())}
            />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}