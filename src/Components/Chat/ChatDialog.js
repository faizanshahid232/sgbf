import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef, useState,useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useSocket from "../socket/useSocket";

const ChatDialog = ({ handleChat }) => {
  const divRef = useRef(null);
  const [datas, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailData, setEmailData] = useState("");
  const [emailError, setEmailError] = useState('');

  const { socket, connected } = useSocket();

  useEffect(() => {
    if (connected) {
      console.log("socket connected", socket.id);
      socket.on("updated", onResponseHandle);
    }
    return () => {
      socket?.off("updated", onResponseHandle);
    };
  }, [connected]);

  const onResponseHandle = (response) => {
    console.log("onResponseHandle", response);
  }

  const validateEmail = (email) => {
    // Basic email format validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail === '') {
      setEmailError('');
    } else if (validateEmail(newEmail)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
    }
  };

  const handleEmail = () => {
    setEmailData(email);
    setEmail('');
  }


  return (
    <Grid container>
      <Grid
        item
        md={12}
        sx={{
          backgroundColor: "#58a30a",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          color: "white",
        }}
      >
        <Box
          className="row-space-around-flex"
          sx={{ alignItems: "center" }}
          mx={3}
          py={2}
        >
          <Typography variant="body1" sx={{ color: 'white' }}>Welcome to Saudi Green Building Forum</Typography>
          <CloseOutlinedIcon
            className="chat-header-icon1"
            onClick={handleChat}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      </Grid>
      {!emailData ?
        <Grid
          item
          sm={12}
          p={3}
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: "300px" }}
        >
          <Typography variant="subtitle1" p={2}>Please provide the Email Address for Support Chat</Typography>
          <Box className="row-simple-container-item">
            <TextField
              inputProps={{ style: { fontSize: 12 } }}
              sx={{ width: "80%", margin: "2%" }}
              placeholder="Enter Email Address"
              type="Email"
              onChange={handleEmailChange}
              value={email}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <IconButton onClick={handleEmail}>
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
        :
        <p>dd</p>}
      {/* <Grid
        item
        sm={12}
        sx={{ textAlign: "center", height: "300px", overflowY: "scroll" }}
      >
        {datas.length === 0 ? null : (
          <Grid container>
            {datas &&
              datas.map((result) =>
                result.admin_id !== null ? (
                  <Grid item md={12} key={result.id}>
                    <Grid container>
                      <Grid item md={6}>
                        <Box
                          className="row-simple-container-item"
                          mx={3}
                          py={2}
                        >
                          <AccountCircleIcon className="chat-header-icon chat-content1-icon" />
                          &nbsp;
                          <Typography className="chat-content-text1">
                            {result.comments}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item md={6}></Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item md={12} key={result.id}>
                    <Grid container>
                      <Grid item md={6}></Grid>
                      <Grid item md={6}>
                        <Box
                          className="row-simple-container-item"
                          sx={{ float: "right" }}
                          mx={3}
                          py={2}
                        >
                          <Typography className="chat-content-text2">
                            {result.comments}
                          </Typography>
                          &nbsp;
                          <AccountCircleIcon className="chat-header-icon" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              )}
            <div ref={divRef} />
          </Grid>
        )}
      </Grid> */}
      {!emailData ? null :
        <Grid item sm={12} className="chat-input">
          <Box className="row-simple-container-item">
            <TextField
              inputProps={{ style: { fontSize: 10 } }}
              sx={{ width: "80%", margin: "2%" }}
              placeholder="Please write your and press the send button... "
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <IconButton>
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
      }
    </Grid>
  );
};

export default ChatDialog;
