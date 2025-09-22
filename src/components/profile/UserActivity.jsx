import React, { useState } from "react";
import UserOrderList from "./UserOrderList";
import UserWishlist from "./UserWishlist";
import UserCartList from "./UserCartList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
      className="h-full"
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
  1: "Orders",
  2: "Wishlist",
  3: "Cart",
  4: "Coupon",
};

const tabMenuArray = Object.values(tabsMenuObj);
const customWidth = 100 / tabMenuArray.length;

const tabPanelContent = {
  1: <UserOrderList />,
  2: <UserWishlist />,
  3: <UserCartList />,
  4: <div>Coupon</div>,
};

const UserActivity = () => {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  return (
    <div
      id="user-activity-container"
      className="w-full min-h-full px-3 flex flex-col gap-5"
    >
      <div id="activity-tab-container" className="mx-3">
        <Tabs
          value={valueTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            maxWidth: {
              xs: "none", // fits about 3 tabs on xs
            },
            width: "100%",
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              color: "#AAB6C3",
              "&.Mui-selected": {
                color: "#2d2c2aff",
                backgroundColor: "#E6E8EB",
                borderRadius: {
                  xs: "10px",
                  sm: "15px",
                },
              },
              "&:hover": {
                color: "#2d2c2aff",
              },
            },
          }}
        >
          {tabMenuArray.map((item, index) => (
            <Tab
              label={item}
              key={index}
              sx={{
                width: {
                  xs: `${customWidth}%`,
                },
              }}
            />
          ))}
        </Tabs>
      </div>
      <div id="activity-content" className="w-full h-full">
        {tabMenuArray.map((item, index) => {
          return (
            <TabPanel value={valueTab} index={index} key={index}>
              {tabPanelContent[index + 1]}
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};

export default UserActivity;
