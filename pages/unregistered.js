// Images are from One Piece Wiki
// https://onepiece.fandom.com/wiki/One_Piece_Wiki

import { Box, Image } from '@skynexui/components';

export default function Unregistered(){
    return(
        <Box styleSheet={{margin: '20px', display:'flex',alignItems: 'center'}}>
            <Image
                    styleSheet={{
                        marginRight: '30px',                        
                    }} 
                    src={'https://static.wikia.nocookie.net/onepiece/images/0/0a/Zoro_Anime_Concept_Art.png'} /> 
            <Box>
                <p>Hey, if you are trying to break this awesome app, I'll <strong>hunt you down</strong>!</p>
                <br />
                <p>Only the following Straw Hat Pirates are available for login:</p>
                <br />
                <ul>
                    <li>Luffy</li>
                    <li>Zoro</li>
                    <li>Nami</li>
                    <li>Sanji</li>
                    <li>Chopper</li>
                    <li>Robin</li>
                </ul>
                <br />
                <p>Hit back and type the available user names!</p>
            </Box>
        </Box>
    );
}

