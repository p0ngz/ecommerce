import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import ContentBlogs from "./ContentBlogs";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const tabsMenuObj = {
  1: "Accessories",
  2: "Bling Chronicles",
  3: "Jewelry",
  4: "News",
};
const tabMenuArray = Object.values(tabsMenuObj);
const customWidth = 100 / tabMenuArray.length;
const BlogsComponent = () => {
  const navigate = useNavigate();
  const [valueTab, setValueTab] = useState(0);
  const [tab, setTab] = useState("Accessories");
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  useEffect(() => {
    setTab(() => {
      return tabMenuArray[valueTab].split(" ").join("");
    });
  }, [valueTab])
  return (
    <div
      id="blog-container"
      className="relative px-5 py-10 w-full min-h-[70vh]"
    >
      <h2 id="blogs-title" className="text-center mb-3 text-3xl lg:text-5xl">
        Blogs
      </h2>
      <div id="blogs-breadcrumb" className="flex justify-center mb-10">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "inherit",
              fontWeight: "bold",
              fontSize: "1rem",
              mx: 1,
            },
          }}
        >
          <Typography
            underline="hover"
            onClick={() => navigate("/")}
            className="hover:"
            color="inherit"
            sx={{
              "&:hover": {
                color: "black",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              },
            }}
          >
            Home
          </Typography>

          <Typography
            sx={{
              color: "text.primary",
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
            }}
          >
            Blogs
          </Typography>
        </Breadcrumbs>
      </div>
      <div id="blogs-menu" className="w-full h-auto">
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={valueTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{
              maxWidth: {
                xs: 425, // fits about 3 tabs on xs
                sm: "none", // show all tabs on sm and up
              },
              width: "100%",
            }}
          >
            {tabMenuArray.map((item, index) => (
              <Tab
                label={item}
                key={index}
                sx={{
                  width: {
                    sm: `${customWidth}%`,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </div>
      <div id="blogs-content" className="w-full h-auto">
        {tabMenuArray.map((item, index) => {
          return (
            valueTab === index && (
              <TabPanel value={valueTab} index={index} key={index}>
                <ContentBlogs type={tab} />
              </TabPanel>
            )
          );
        })}
      </div>
    </div>
  );
};

export default BlogsComponent;
