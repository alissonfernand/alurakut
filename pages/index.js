import styled from 'styled-components'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';


const ProfileSidebar = (props) => {
  return(
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} styled={{borderRadius: '8px'}} />
    </Box>
  )
}


export default function Home() {
  const usuarioAleatorio = 'alissonfernand';
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  return (
    <>
      <AlurakutMenu />
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
        </div>

        <div className="profileRelationsArea" styled={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} />
                      <span>{pessoa}</span>
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
