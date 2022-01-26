import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json'
import React from 'react';
import { useRouter } from 'next/router';


//componente React para criar nossa própria tag de título para diferentes tipos de título
function Title(props){
    //props é aquilo que vem ao chamar o componente (são os parâmetros)
    //props.children retorna o que foi escrito na tag
    //parâmetros passados ao chamar o componente também podem ser recuperados em props
    const Tag = props.tag || 'h1';

    // tag vazia no return somente para que haja o retorno de um pai (não pode retornar mais de 1)
    return(
        <>
            <Tag>{props.children}</Tag>
            {/*estilo somente para esse componente*/}
            <style jsx>{`
                ${Tag}{
                    color: ${appConfig.theme.colors.neutrals["000"]};
                    font-size: 32px;
                    font-weight: 600
                }
            `}
            </style> 
        </>
    );
}

// Component React para a Landing Page
// function HomePage() {
//     //JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Title tag="h2">Boas vindas de volta!</Title>
//             <h2>Discord - Alura Matrix</h2>

   
//         </div>

//     )
// }

// export default HomePage

//página inicial criada pelo devsoutinho @omariosouto
export default function PaginaInicial() {
    //altera a imagem de perfil padrão da home
    /*
    Ainda está hardcoded... Outras opções:
    5/5d/Roronoa_Zoro
    f/f9/Monkey_D._Luffy
    3/3b/Nami
    c/ca/Sanji
    7/75/Tony_Tony_Chopper
    b/b8/Nico_Robin
    0/09/Brook
    */
    /* useState irá retornar dois valores: o primeiro é o valor que você passa no parâmetro
    da função, e o segundo é uma função setter (no React denominam "hook"), que irá alterar 
    o valor da variável quando houver uma mudança de estado que altere a variável. O retorno 
    não é um array; é a forma usada para dizer que a função retorna mais de um valor 
    (lembra um pouco de tupla em Python)    
    */
    const [pirate, setPirate] = React.useState('7/75/Tony_Tony_Chopper');
    
    //variável para mostrar o avatar (imagem do usuário)
    const [avatar, setAvatar] = React.useState(pirate)

    //hook que irá lidar com as mudanças para outras páginas
    const roteamento = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals["000"],
                    // backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                    backgroundImage: 'url(https://img.wallpapersafari.com/desktop/1024/576/47/99/5SVQqr.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                        xs: 'column',
                        sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[999],
                    }}
                >

                    {/* Formulário */}
                    <Box
                        as="form"

                        // função que irá alterar o estado quando o usuário clicar no botão
                        onSubmit={function(event){
                            //impede que a ação padrão aconteça 
                            //no caso, seria a ida para outra página
                            //ganhamos o controle para decidir o que fazer
                            event.preventDefault()
                            
                            //altera de página pelo hook do next, sem precisar de um refresh no navegador
                            roteamento.push('/chat')
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >

                        <Title tag="h2">Ahoy, pirate!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200] }}>
                        {appConfig.name}
                        </Text>

                        {/* campo para digitar o usuário */}
                        <TextField
                            value={pirate}
                            // função para verificar mudanças de estados nessa tag
                            onChange={function(event){
                                //event traz diversas informações; use o console para ver
                                // console.log(event)

                                //event.target.value traz o valor escrito na caixa de texto
                                const pirateName = event.target.value;  

                                //altera o valor da variável pirate por meio do setter (usando o React)
                                setPirate(pirateName);

                                //mostra a imagem se houver mais de 2 caracteres
                                if(pirateName.length > 2){
                                    setAvatar(pirateName)
                                }
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                textColor: appConfig.theme.colors.neutrals[999],
                                mainColor: appConfig.theme.colors.neutrals[300],
                                mainColorHighlight: appConfig.theme.colors.primary[900],
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                            },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Get me a Den Den Mushi'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[800],
                                mainColorLight: appConfig.theme.colors.primary[500],
                                mainColorStrong: appConfig.theme.colors.primary[900],
                            }}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[900],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            // src={`https://github.com/${username}.png`}

                            src={`https://static.wikia.nocookie.net/onepiece/images/${avatar}%27s_Current_Wanted_Poster.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals["000"],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {pirate.substring(5).replace(/_/g, ' ')}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}