import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SidebarMenu from "./sidebarProducts/SidebarMenu";

const SidebarProductsComponent = ({
  toggleSidebar,
  sendStatusToParent = () => {},
}) => {
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
    <Box
      sx={{
        width: {
          xs: "100vw",
          sm: "320px",
        },
      }}
      role="presentation"
    >
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
      <SidebarMenu />
    </Box>
  );
  return (
    <div className="absolute overflow-y-scroll">
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SidebarProductsComponent;
