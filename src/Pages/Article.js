import React from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import CustomButton from "../Components/UI/CustomButton";
import CustomInputs from "../Components/UI/CustomInputs";
import img from "../Assets/img/Greenbuild-2017-4-889x592.jpg";
function Article() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          width={"100%"}
        >
          <CustomInputs placeholder="search" width={"400px !important"} />
          <CustomButton variant="primaryOutlined" width={"auto"}>
            SEARCH
          </CustomButton>
          <CustomButton variant="primaryOutlined" width={"auto"}>
            RESET
          </CustomButton>
        </Box>
      </Grid>
      <Grid
        item
        display={"flex"}
        sm={12}
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
        padding={4}
      >
        <Box>
          <img
            src={img}
            alt="img"
            height={"150px"}
            width={"300px"}
            style={{ objectFit: "fill" }}
          />
        </Box>
        <Link to="/article">
          <Box width={"400px"}>
            <Typography color={"#C82334"}>name</Typography>
            <Typography color={"#C82334"}>date</Typography>
            <Typography color={"#C82334"}>forum</Typography>
          </Box>
        </Link>
      </Grid>
      <Grid
        item
        display={"flex"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Grid>
    </Grid>
  );
}

export default Article;
