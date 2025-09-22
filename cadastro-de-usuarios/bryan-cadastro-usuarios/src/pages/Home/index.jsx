import './style.css'
import Lixeira from '../../assets/lixeira.png'
import Lapis from '../../assets/lapis.png'   // novo ícone
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()
  const [editando, setEditando] = useState(null) // guarda o id do usuário em edição

  async function getUsuarios() {
    const usuariosDaApi = await api.get('/cadastro')
    setUsuarios(usuariosDaApi.data)
  }

  async function createUsuarios() {
    await api.post('/cadastro',{
        email: inputEmail.current.value,
        nome: inputNome.current.value,
        idade: inputIdade.current.value,
    })
    limparInputs()
    getUsuarios()
  }

  async function deleteUsuarios(id) {
    await api.delete(`/cadastro/${id}`)
    getUsuarios()
  }

  // função de update
  async function updateUsuarios() {
    if(editando){
      await api.put(`/cadastro/${editando}`, {
        email: inputEmail.current.value,
        nome: inputNome.current.value,
        idade: inputIdade.current.value,
      })
      limparInputs()
      setEditando(null) // sai do modo edição
      getUsuarios()
    }
  }

  function limparInputs(){
    inputNome.current.value = ""
    inputIdade.current.value = ""
    inputEmail.current.value = ""
  }

  function preencherFormulario(usuario){
    inputNome.current.value = usuario.nome
    inputIdade.current.value = usuario.idade
    inputEmail.current.value = usuario.email
    setEditando(usuario.id) // entra no modo edição
  }

  useEffect(()=>{
    getUsuarios()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Digite seu nome' name='nome' type="text" ref={inputNome}/>
          <input placeholder='Digite sua idade' name='idade' type="text" ref={inputIdade}/>
          <input placeholder='Digite seu email' name='email' type="text" ref={inputEmail}/>

          {editando ? (
            <button type='button' onClick={updateUsuarios}>Atualizar</button>
          ) : (
            <button type='button' onClick={createUsuarios}>Cadastrar</button>
          )}
        </form>

        {usuarios.map(usuario => (
          <div key={usuario.id} className = 'card'>
            <div>
              <p>Nome: {usuario.nome}</p>
              <p>Idade: {usuario.idade}</p>
              <p>Email: {usuario.email}</p>
            </div>
          <div className="botoes-card">
            <button onClick={()=> preencherFormulario(usuario)}>
              <img src={Lapis} alt="Editar"/>
            </button>
            <button onClick={()=> deleteUsuarios(usuario.id)}>
              <img src={Lixeira} alt="Excluir"/>
            </button>
          </div>
        </div>
        ))}
      </div>
    </>
  )
}

export default Home

