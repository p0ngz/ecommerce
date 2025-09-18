import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const sidebarData = ["Home", "Products", "Blogs"];
const routerData = ["/", "/products", "/blogs"];
const SidebarComponent = ({ toggleSidebar, sendStatusToParent }) => {
  const [open, setOpen] = useState(false);
  const toggleButtonRef = useRef(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    sendStatusToParent(false);
  };
  useEffect(() => {
    setOpen(toggleSidebar);
  }, [toggleSidebar]);
  const DrawerList = (
    <Box sx={{ width: 320 }} role="presentation" onClick={toggleDrawer(false)}>
      <div id="sidebar-action" className="px-3 py-5 w-full flex justify-end">
        <motion.button
          ref={toggleButtonRef}
          className="p-2 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 hover:text-gray-600  transition hover:cursor-pointer"
          aria-label="Close sidebar"
          whileHover="hover"
          onClick={toggleDrawer(false)}
        >
          <motion.span className="block w-3 h-3 relative ">
            <motion.span
              className="absolute left-1/2 top-1/2 w-4 h-0.5 bg-gray-400 rotate-45 -translate-x-1/2 -translate-y-1/2"
              variants={{
                initial: { rotate: 45 },
                hover: { rotate: -45 },
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span
              className="absolute left-1/2 top-1/2 w-4 h-0.5 bg-gray-400  -rotate-45 -translate-x-1/2 -translate-y-1/2"
              variants={{
                initial: { rotate: -45 },
                hover: { rotate: 45 },
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </motion.span>
        </motion.button>
      </div>
      <div id="sidebar-menu" className="">
        {/* Material ui component we styling it by using sx = {{}} */}
        <List>
          {sidebarData.map((text, idx) => (
            <React.Fragment key={text}>
              <Link to={routerData[idx]}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ py: 2 }}>
                    <div className="w-full h-full flex justify-between items-center hover:text-[#63512D]">
                      <p>{text}</p>
                      <KeyboardArrowRightIcon
                        fontSize="medium"
                        className="pt-1 text-gray-400"
                      />
                    </div>
                  </ListItemButton>
                </ListItem>
              </Link>

              {idx < sidebarData.length && (
                <Divider sx={{ mx: 2, borderColor: "#e5e7eb" }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </div>
    </Box>
  );
  return (
    <div className="absolute">
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SidebarComponent;
