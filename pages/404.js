import { Box, Text, Image } from '@skynexui/components';
export default function NotFound(){
    return(
        <>
            <Box
                styleSheet={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: { xs: '100%', sm: '50%' }, 
                    textAlign: 'center', 
                    marginBottom: '32px',
                }}>
                <Text styleSheet={{margin:'22px'}}>Oy, mate. These are uncharted lands. Go back!</Text>
                <Image
                    styleSheet={{
                        marginBottom: '16px',
                        width:'800px', 
                        height:'600px',
                        display:'flex',
                        flexDirection: 'row',
                    }} 
                    src={'https://c.tenor.com/xaHaRw0y6LgAAAAd/one-piece-anime.gif'} />   
            </Box>
        </>
    )
}