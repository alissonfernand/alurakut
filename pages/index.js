import React, {useState} from 'react';
import {AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault} from '../src/lib/AlurakutCommons';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';


const ProfileSidebar = (props) => {
  return(
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} styled={{borderRadius: '8px'}} />
      <hr />

      <p>
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
    </p>
    <hr />

    <AlurakutProfileSidebarMenuDefault />
    </Box>

   
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {
  const usuarioAleatorio = 'alissonfernand';

  const [comunidades, setComunidades] = useState([]);

  const [seguidores, setSeguidores] = useState([]);

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];



  React.useEffect(() => {
    fetch('https://api.github.com/users/peas/followers')
    .then((respostaDoServidor) => {
      return respostaDoServidor.json();
    })
    .then((respostaCompleta) => {
      setSeguidores(respostaCompleta);
    })

    // API GRAPHQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '49c9c20b78ca2b4e3dc5b7e3503b59',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            id 
            title
            imageUrl
            creatorslug
          }
        }`
      })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato);
    })
  },[]);

  function handleCriarComunidade(e) {
    e.preventDefault();

    const dadosDoForm = new FormData(e.target);

    const comunidade = {
      title: dadosDoForm.get('title'),
      imageUrl: dadosDoForm.get('image'),
      creatorSlug: usuarioAleatorio,
    }

    fetch('/api/community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    })
    .then(async (response) => {
      const dados = await response.json();
      const comunidade = dados.registroCriado;
      const comunidadesAtualizadas = [...comunidades, comunidade];
      setComunidades(comunidadesAtualizadas)
    })

  }


  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        <div className="profileArea" styled={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>

        <div className="welcomeArea" styled={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet /> 
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={handleCriarComunidade}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>

              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" styled={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
               Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li key={pessoa}>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>

            <ul>
              {comunidades.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/communities/${comunidade.id}`}>
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}
