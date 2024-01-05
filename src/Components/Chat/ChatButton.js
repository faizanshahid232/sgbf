import { Box, Fab } from '@mui/material'
import React, { useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import ChatDialog from './ChatDialog';

const ChatButton = () => {
    const [openChat, setOpenChat] = useState(false);
    const handleChat = () => {
        setOpenChat(!openChat);
    };
    return (
        <Box className="bottom-right-btn">
            {openChat === true ? null :
                <Fab color="primary" aria-label="add" onClick={handleChat}>
                    <ChatIcon />
                </Fab>}
            <Box
                sx={{ display: openChat === false ? "none" : "block" }}
                className="bottomright"
            >
                <ChatDialog
                    handleChat={handleChat}
                />
            </Box>
        </Box>
    )
}

export default ChatButton