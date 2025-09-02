import './style.css'
import Lixeira from '../../assets/lixeira.png'

function Home() {
  const usuarios = [{
    id: 'eissoae',
    nome: 'Teste',
    idade: 30,
    email: 'teste@email.com'
  }, {
    id: 'yowyowyow',
    nome: 'Doug',
    idade: 17,
    email: 'doug@email.com'
  }]

  return (
    <>
      <div className='container'>
        <form>
          <h1>Olá Mundo</h1>
          <input name='nome' type="text" />
          <input name='idade' type="text" />
          <input name='email' type="text" />
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
