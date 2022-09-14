# Imersão Alura 2022: Chat feito com React (Aluracord)

Este foi um projeto desenvolvido durante uma [Imersão da Alura](https://www.alura.com.br/imersao-react). A proposta foi desenvolver um chat, nomeado Aluracord, utilizando Javascript, Nodejs e componentes React. No chat é possível enviar mensagens de texto, stickers e também gifs.

Estilizei meu projeto com uma temática de One Piece, e dei a ele o nome de "Online Transponder Snail". As páginas estão em inglês, mas o código em si está em português, incluindo comentários e algumas anotações feitas durante as aulas.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Online Transponder Snail**
| :label: Tecnologias | HTML, CSS, JavaScript, React, Nodejs
| :rocket: URL         | https://aluracord-online-transponder-snail.vercel.app
| :fire: Desafio     | https://www.alura.com.br/imersao-react

![screenshot parcial da tela de login](https://user-images.githubusercontent.com/19349339/190253982-a5f9dadd-7961-4b59-95fc-a6e4efaf0175.png#vitrinedev)

## Detalhes do projeto

Instrutores: [@alura](https://github.com/alura), [@omariosouto](https://github.com/omariosouto), [@peas](https://github.com/peas)

A Alura é uma escola online de tecnologias, que promove estas imersões (grátis e aberta a todos) em que se aprofunda em uma tecnologia, 
desenvolvendo um projeto durante 5 dias, com o apoio de uma equipe especializada, que ajuda e ensina por meio de vídeos e lives, além de abrir um servidor no Discord
para os participantes conversarem, tirarem dúvidas e compartilharem conhecimentos e resultados. 

Para o projeto, foram desenvolvidas quatro telas: login, que puxa a imagem do usuário (no caso, os Piratas do Chapéu de Palha) dos [pôsteres disponibilizados na Wiki de One Piece](https://onepiece.fandom.com/wiki/Bounties/Gallery); a tela de chat, em que é possível enviar textos, stickers e também gifs (por meio da URL do gif); uma tela para erro 404; e, por fim, uma tela para usuários não cadastrados que tentem fazer login no chat.

O projeto iniciou sem um back-end para armazenar as mensagens, e depois evoluiu para uma integração com o [Supabase](https://supabase.com), uma ferramenta 
open source que funciona como um "Back-End as a Service", permitindo criar um banco de dados para armazenar as mensagens do chat e persistir todo o histórico
de mensagens trocadas. Infelizmente, por ser gratuito, o Supabase pausa bancos criados que fiquem inativos por muito tempo, então **pode ser que ao acessar o site,
o banco não esteja mais funcionando** e não seja possível conectar ao chat (somente à tela de login).

O chat criado pode ser acessado em https://aluracord-online-transponder-snail.vercel.app.

## Telas do projeto

### Página de login
![screenshot da tela de login](https://user-images.githubusercontent.com/19349339/160727446-60627efa-34bb-40ff-8ba1-c12a7b302b83.png)

### Chat
![screenshot da tela de chat](https://user-images.githubusercontent.com/19349339/160727699-5b3281bf-a37a-4850-b0e1-90ccc0eb6675.png)

### Destaque para o botão com envio de emojis/stickers
![screenshot com destaque para o botão de envio de stickers](https://user-images.githubusercontent.com/19349339/160728168-6f76f9aa-0f3e-4c62-83e6-218503dc001d.png)

### Tela 404
![screenshot da tela de erro 404](https://user-images.githubusercontent.com/19349339/190253107-c0ea7ee1-22e4-41a5-9314-7b20d17c7eed.png)

### Tela para acesso indevido
![screenshot da tela para acesso indevido](https://user-images.githubusercontent.com/19349339/190253376-e177da52-4bbc-43a9-9fd1-dd358a875f25.png)

## Agradecimentos
Agradeço à Alura por essa semana intensa em que mergulhei em tecnologias que tinha zero conhecimento, mas que me diverti e aprendi muito. Um agradecimento 
especial ao [Mario Souto](https://br.linkedin.com/in/omariosouto), que ministrou as aulas e que manja muito de várias tecnologias.
