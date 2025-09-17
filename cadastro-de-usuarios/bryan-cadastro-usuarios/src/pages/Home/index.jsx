import './style.css'
import Lixeira from '../../assets/lixeira.png'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  //let usuarios = []
  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  async function getUsuarios() {
    const usuariosDaApi = await api.get('/cadastro')
    //usuarios = usuariosDaApi.data
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }

  async function createUsuarios() {
    await api.post('/cadastro',{
        email: inputEmail.current.value,
        nome: inputNome.current.value,
        idade: inputIdade.current.value,
    })
    getUsuarios()
  }

  async function deleteUsuarios(id) {
    await api.delete(`/cadastro/${id}`)
  }

  useEffect(()=>{
    getUsuarios()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Digite seu nome' name='nome' type="text" ref={inputNome}/>
          <input placeholder='Digite sua idade' name='idade' type="text" ref={inputIdade}/>
          <input placeholder='Digite seu email' name='email' type="text" ref={inputEmail}/>
          <button type='button' onClick={createUsuarios}>Cadastrar</button>
        </form>

        {usuarios.map(usuario => (
          <div key={usuario.id} className = 'card'>
            <div>
              <p>Nome: {usuario.nome}</p>
              <p>Idade: {usuario.idade}</p>
              <p>Email: {usuario.email}</p>
            </div>
          <button onClick={ ()=> deleteUsuarios(usuario.id)}>
            <img src={Lixeira}/>
          </button>
        </div>
        ))}

      </div>
    </>
  )
}

export default Home
