/* 
Isso não é uma página! É um arquivo do Next que encapsula todas as páginas nesta pasta
para serem carregadas juntas (é um wrapper). Todas as páginas informadas aqui poderão 
utilizar o que aqui for declarado, criado, etc. então podemos colocar aqui o que for 
"global" para essas páginas, sem precisar importar o arquivo em cada uma delas.
*/

//componente que terá todos os estilos "globais" que podem ser usados em qualquer página
//é uma convenção chamar de GlobalStyle 
//será usado para o CSS Reset
//usa o parâmetro global para ser entendido realmente como global
function GlobalStyle() {
    return (
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
}

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
  }