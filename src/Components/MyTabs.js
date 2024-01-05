import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const matches = useMediaQuery("(max-width:850px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginLeft: matches ? "0px" : "250px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Every Thing" {...a11yProps(0)} />
          <Tab label="Conferences" {...a11yProps(1)} />
          <Tab label="Trainings" {...a11yProps(2)} />
          <Tab label="Workshops" {...a11yProps(3)} />
          <Tab label="Past" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography
          textAlign={"center"}
          fontSize={"2.5rem"}
          width={"100%"}
          padding={4}
          sx={{ backgroundColor: "gray.50", color: "black" }}
        >
          There are no events at this time.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography
          textAlign={"center"}
          fontSize={"2.5rem"}
          width={"100%"}
          padding={4}
          sx={{ backgroundColor: "gray.50", color: "black" }}
        >
          There are no Conferences at this time.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography
          textAlign={"center"}
          fontSize={"2.5rem"}
          width={"100%"}
          padding={4}
          sx={{ backgroundColor: "gray.50", color: "black" }}
        >
          There are no Trainings at this time.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography
          textAlign={"center"}
          fontSize={"2.5rem"}
          width={"100%"}
          padding={4}
          sx={{ backgroundColor: "gray.50", color: "black" }}
        >
          There are no Workshops at this time.
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography
          textAlign={"center"}
          fontSize={"2.5rem"}
          width={"100%"}
          padding={4}
          sx={{ backgroundColor: "gray.50", color: "black" }}
        >
          There are no Past at this time.
        </Typography>
      </TabPanel>
    </Box>
  );
}
