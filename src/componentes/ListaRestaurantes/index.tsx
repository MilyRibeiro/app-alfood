import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
// import { nodeModuleNameResolver } from 'typescript';
import { IPaginacao } from '../../interfaces/IPaginacao';

interface IparametrosDeBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {

  // const restaurantes: IRestaurante[] = [
  //   {
  //     id: 1,
  //     nome: "Lyllys Cafe",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Lasanha à Bolonhesa',
  //         imagem: 'https://receitassaborosa.com/wp-content/uploads/2019/12/Lasanha-com-Molho-a-Bolonhesa.jpg',
  //         nome: 'Lasanha',
  //         restaurante: 1,
  //         tag: 'Italiana'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Strogonoff de Frango à brasileira',
  //         imagem: 'https://img.itdg.com.br/images/recipes/000/002/462/332854/332854_original.jpg',
  //         nome: 'Strogonoff',
  //         restaurante: 1,
  //         tag: 'Russa'
  //       },
  //       {
  //         id: 3,
  //         descricao: 'Empadão de Frango',
  //         imagem: 'https://t1.uc.ltmcdn.com/pt/images/5/7/1/img_como_fazer_empadao_de_frango_27175_600.jpg',
  //         nome: 'Empadão de Frango',
  //         restaurante: 1,
  //         tag: 'Portuguesa'
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     nome: "Sugiro Sushi",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Combinado de 8 peças',
  //         imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/5031e263a4a258791d6306b2d3d9dbf6_XL.jpg',
  //         nome: 'Sushi',
  //         restaurante: 1,
  //         tag: 'Japonesa'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Sashimi de Salmão',
  //         imagem: 'https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2009/04/sashimi_facil.jpg',
  //         nome: 'Sashimi',
  //         restaurante: 1,
  //         tag: 'Japonesa'
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     nome: "Cantina da Escola",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Salgado de queijo com presunto',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/102/312/279767/279767_original.jpg',
  //         nome: 'Quejunto',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Coxinha de Frango',
  //         imagem: 'https://t1.rg.ltmcdn.com/pt/posts/1/9/1/coxinha_simples_191_600.jpg',
  //         nome: 'Coxinha',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       },
  //       {
  //         id: 3,
  //         descricao: 'Risole de Palmito',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/005/116/323871/323871_original.jpg',
  //         nome: 'Risole',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       }
  //     ]
  //   }
  // ]

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      }).catch(erro => {
        console.log(erro);
      })
  }

  // A cada busca, montamos um objeto de opções:
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const opcoes = {
      params: {

      } as IparametrosDeBusca
    }
    if (busca) {
      opcoes.params.search = busca;
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes);
  }

  useEffect(() => {
    // obter restaurantes:
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(resposta => {
        console.log(resposta);
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      }).catch(erro => {
        console.log(erro);
      })
  }, []);

  // const verMais = () => {
  //   axios.get<IPaginacao<IRestaurante>>(proximaPagina)
  //   .then(resposta => {
  //     setRestaurantes([...restaurantes, ...resposta.data.results]);
  //     setProximaPagina(resposta.data.next);
  //   }).catch(erro => {
  //     console.log(erro);
  //   })
  // }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form onSubmit={buscar}>
        {/* <div>
          <input type='submit' value={busca} onChange={evento => setBusca(evento.target.value)} />
        </div> */}
        <div>
          <label htmlFor='select-ordenacao'>Ordenação</label>
          <select
            name='select-ordenacao'
            id='select-ordenacao'
            value={ordenacao}
            onChange={evento => setOrdenacao(evento.target.value)}
          >
            <option value=''>Padrão</option>
            <option value='id'>Por ID</option>
            <option value='nome'>Por nome</option>
          </select>
        </div>
        <div>
          <button type='submit'>Buscar</button>
        </div>
      </form>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {/* {proximaPagina && <button onClick={verMais}>Ver mais</button>} */}
      {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
        Página anterior
      </button>}
      {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima página</button>}
    </section>
  );
}

export default ListaRestaurantes;