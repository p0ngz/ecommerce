import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const sidebarData = ["Home", "Shop", "Product", "Blog", "Featured"];
const SidebarComponent = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 320 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* <List>
        {["Home", "Shop", "Product", "Blog", "Featured"].map(
          (text, idx, arr) => (
            // if not use React.Fragment it will error
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
              {idx < arr.length - 1 && <Divider className="px-5" />}
            </React.Fragment>
          )
        )}
      </List> */}
      <div id="sidebar-action" className="px-3 py-5 w-full flex justify-end">
        {/* icon for toggle sidebar */}
        <button
          className="p-2 w-8 h-8 border border-gray-300 flex items-center justify-center rounded hover:bg-gray-200 transition"
          aria-label="Close sidebar"
          onClick={toggleDrawer(false)}
        >
          <span className="block w-3 h-3 relative">
            <span className="absolute left-1/2 top-1/2 w-4 h-0.5 bg-gray-400  rotate-45 -translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute left-1/2 top-1/2 w-4 h-0.5 bg-gray-400  -rotate-45 -translate-x-1/2 -translate-y-1/2"></span>
          </span>
        </button>
      </div>
      <div id="sidebar-menu" className="">
        {/* Material ui component we styling it by using sx = {{}} */}
        <List>
          {sidebarData.map((text, idx) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton sx={{py: 2}}>
                  <div className="w-full h-full flex justify-between items-center hover:text-[#63512D]">
                    <p>{text}</p>
                    <KeyboardArrowRightIcon fontSize="medium" className="pt-1 text-gray-400" />
                  </div>
                </ListItemButton>
              </ListItem>
              {idx < sidebarData.length && <Divider sx={{ mx: 2, borderColor: '#e5e7eb' }} />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </Box>
  );
  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SidebarComponent;
