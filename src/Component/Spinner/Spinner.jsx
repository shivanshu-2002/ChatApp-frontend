import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'

const Spinner = () => {
    return (
        <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="rgba(255, 255, 255, 0.7)" // Semi-transparent white background
            zIndex="9999" // Ensure it appears on top of other content
        >
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Box>
    )
}

export default Spinner
