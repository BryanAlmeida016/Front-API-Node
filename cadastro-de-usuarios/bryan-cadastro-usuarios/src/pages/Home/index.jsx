import './style.css'
import Lixeira from '../../assets/lixeira.png'
import api from '../../services/api'
import { useEffect, useState } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  //let usuarios = []

  async function getUsuarios() {
    const usuariosDaApi = await api.get('/cadastro')
    //usuarios = usuariosDaApi.data
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }

  useEffect(()=>{
    getUsuarios()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Digite seu nome' name='nome' type="text" />
          <input placeholder='Digite sua idade' name='idade' type="text" />
          <input placeholder='Digite seu email' name='email' type="text" />
          <button type='button'>Cadastrar</button>
        </form>

        {usuarios.map(usuario => (
          <div key={usuario.id} className = 'card'>
            <div>
              <p>Nome: {usuario.nome}</p>
              <p>Idade: {usuario.idade}</p>
              <p>Email: {usuario.email}</p>
            </div>
          <button>
            <img src={Lixeira}/>
          </button>
        </div>
        ))}

      </div>
    </>
  )
}

export default Home
