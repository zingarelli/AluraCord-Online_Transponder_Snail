import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

//conexão com o SupaBase; irá funcionar como o backend. É um BAAS.
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// irá executar toda vez que houver um insert na lista de mensagens
function snailListener(adicionaMensagem){
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (resposta) => { 
            adicionaMensagem(resposta.new) //o valor que foi adicionado
        })
        .subscribe();
}

export default function ChatPage() {
    //Router será utilizado para recuperar o usuário passado na URL
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.pirate;
    //console.log('Usuário logado:', usuarioLogado);

    //guarda a mensagem digitada pelo usuário
    const [mensagem, setMensagem] = React.useState('');

    //guarda todas as mensagens do chat (em um array)
    const [listaMensagem, setListaMensagem] = React.useState([]);

    // tudo aquilo que não faz parte do fluxo padrão, 
    // será acionado somente em determinados casos (padrão: no carregamento da página)
    // para evitar fazer requisição no servidor a todo momento 
    React.useEffect(() => {
        //manipulando a tabela para recuperar as mensagens do chat
        supabaseClient
            .from('mensagens') //tabela mensagens
            .select('*') //recuperar tudo
            .order('id', {ascending: false}) //para que as mensagens venham na ordem correta
            .then(({ data }) => { //do que recuperou, traz só data
                //console.log('Dados da consulta', dados); //coloque dados no parâmetro para vir tudo
                setListaMensagem(data);
            });

        //verifica se tem mensagem nova
        snailListener((novaMensagem) => {
            //atualiza a lista de mensagens com a nova mensagem que foi inserida
            setListaMensagem((valorAtualDaLista) => {
                return[
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });
    }, []); //aqui você coloca em que momentos a função pode ser acionada

    // ./Sua lógica vai aqui
    //adiciona a mensagem digitada pelo usuário à lista de mensagens do chat
    function handleNovaMensagem(novaMensagem) {
        //vamos transformar a mensagem em um objeto que traz mais informações 
        const mensagem = {
            //id agora será criado pelo SupaBase
            //id: listaMensagem.length + 1, //a ser passado como key quando mostrarmos cada mensagem como um <li>
            de: usuarioLogado, 
            texto: novaMensagem,
        }

        //insere a mensagem no BD do SupaBase
        supabaseClient
            .from('mensagens')
            .insert(mensagem)
            .then(({ data }) => {
                //console.log('Supabase retornou: ', oQueRetornaNaResposta);
                // setListaMensagem([
                //     // por enquanto, vamos utilizar a resposta do Supabase ao inserir para
                //     // popular a lista de mensagem (sem fazer a consulta à BD) 
                //     data[0], //conteúdo da mensagem enviada
                //     ...listaMensagem,
                // ])
            });

        // os três pontos ... abre o array e "espalha" seu conteúdo
        // assim, estou copiando o conteúdo do array e depois adicionando 
        // a nova mensagem. É um concat. A nova mensagem vem na frente por
        // questão de como está definido o scroll do CSS   

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
                                backgroundColor: appConfig.theme.colors.neutrals[999],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        {/* Interceptação e callback para o evento de clique 
                        para receber o sticker que o usuário selecionou */}
                        <ButtonSendSticker 
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(':sticker:' + sticker)
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
                                padding: '0 3px 0 0',
                                minWidth: '50px',
                                minHeight: '50px',
                                fontSize: '20px',
                                margin: '0 0 8px 12px',
                                lineHeight: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
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
    //ainda um tanto hardcoded para simular diferentes usuários
    var pirates = {
        luffy: 'f/f9/Monkey_D._Luffy',
        zoro: '5/5d/Roronoa_Zoro',
        nami: '3/3b/Nami',
        sanji: 'c/ca/Sanji',
        chopper: '7/75/Tony_Tony_Chopper',
        robin: 'b/b8/Nico_Robin'
    }
    
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
                //variável para mostrar o avatar correto, baseado nos que estão hard-coded em pirates
                const avatar = pirates[mensagem.de.toLowerCase()];
                return (
                    <>
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            margin: '12px 0',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                        >
                        <Box 
                            styleSheet={{
                               display: 'flex',
                               alignItems: 'center',
                               marginBottom: '15px',
                               //border: ''
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    //display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://static.wikia.nocookie.net/onepiece/images/${avatar}%27s_Current_Wanted_Poster.png`}
                            />
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >
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
                        </Box>

                        {/* if no React não retorna nada, então precisamos fazer uma operação
                        que retorna um booleano para ser o if (neste caso, um if ternário) para
                        exibir um sticker ou uma mensagem de texto normal. Chamado de "Modo 
                        Declarativo" */}
                        {mensagem.texto.startsWith(':sticker:') //texto que decidimos usar para denominar um sticker
                        ? (
                            <Image 
                                src={mensagem.texto.replace(':sticker:', '')} 
                                styleSheet={{width:'20%'}}
                            />
                        )
                        :(
                            mensagem.texto
                        )}                    
                    </Text>
                    <hr style={{width: '9%'}} />
                    </>
                )
            })}
        </Box>
    )
}