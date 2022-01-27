import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    /* 
    Tarefa: Usuário digita o texto, aperta Enter e o texto deve aparecer no chat
    
    Dev:
    - [X] Criar campo para digitar a mensagem
    - [X] Tratar o texto e ação de pressionar o Enter por meio do onChange e useState
    - [X] Atualizar a lista de mensagem com a nova mensagem
    - [X] Desafio: Colocar o botão de OK para enviar a mensagem
    - [ ] Desafio: Colocar um botão para apagar uma mensagem
    */

    //guarda a mensagem digitada pelo usuário
    const [mensagem, setMensagem] = React.useState('');

    //guarda todas as mensagens do chat (em um array)
    const [listaMensagem, setListaMensagem] = React.useState([]);

    // ./Sua lógica vai aqui
    //adiciona a mensagem digitada pelo usuário à lista de mensagens do chat
    function handleNovaMensagem(novaMensagem) {
        //vamos transformar a mensagem em um objeto que traz mais informações 
        const mensagem = {
            id: listaMensagem.length + 1, //a ser passado como key quando mostrarmos cada mensagem como um <li>
            de: 'vanessametonini', //por enquanto hardcoded, mais tarde puxar o username
            texto: novaMensagem,
        }

        // os três pontos ... abre o array e "espalha" seu conteúdo
        // assim, estou copiando o conteúdo do array e depois adicionando 
        // a nova mensagem. É um concat. A nova mensagem vem na frente por
        // questão de como está definido o scroll do CSS   
        setListaMensagem([
            mensagem,
            ...listaMensagem,
        ])

        //limpa a variável da mensagem para o campo de texto voltar a ficar em branco
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://img.wallpapersafari.com/desktop/1024/576/47/99/5SVQqr.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaMensagem} />

                    <Box
                        as="form"

                        //impede o refresh ao clicar no botão de enviar mensagem
                        onSubmit={(event) => {
                            event.preventDefault()
                        }}

                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                // console.log(event)
                                const valor = event.target.value;
                                setMensagem(valor)
                            }}
                            //traz detalhes do botão pressionado no teclado
                            onKeyPress={(event) => {
                                //console.log(event)
                                if (event.key === 'Enter') {
                                    //impede a quebra de linha depois de apertar Enter
                                    event.preventDefault();

                                    //função que irá adicionar a mensagem no chat
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '90%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        < Button 
                            onClick={() => {
                                handleNovaMensagem(mensagem)
                            }}
                            type='submit'
                            label='Send'
                            styleSheet={{
                                width: '10%',
                                height: '85%',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

//componente para criar o conteúdo da tag Header, com o nome do chat e botão de logout
function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Online Transponder Snail
                </Text>
                <Button
                    // variant='secondary'
                    // colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

// componente para criar o conteúdo da tag MessageList, em que serão exibidas as mensagens do chat
// precido do props para poder acessar a lista de mensagens (é uma const do ChatPage), passada por parâmetro
function MessageList(props) {
    // console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/vanessametonini.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}
        </Box>
    )
}