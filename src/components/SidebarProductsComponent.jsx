import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { sidebarProductTopicData } from "./sidebarProducts/sidebarProductTopic";
import CollectionTopic from "./sidebarProducts/CollectionTopic";
import AvailabilityTopic from "./sidebarProducts/AvailabilityTopic";
import PriceTopic from "./sidebarProducts/PriceTopic";
import ColorTopic from "./sidebarProducts/ColorTopic";
import SizeTopic from "./sidebarProducts/SizeTopic";

// use Context for pass data and implement it
const accordionList = [
  <CollectionTopic />,
  <AvailabilityTopic />,
  <PriceTopic />,
  <ColorTopic />,
  <SizeTopic />,
];
/*
When to fetch from API (backend filtering):
 - Large datasets: If your product list is big (hundreds/thousands of items), always filter on the backend. Fetch only what you need.
 - Dynamic data: If the data can change often (e.g., inventory, prices), fetch fresh data from the API.
 - SEO or deep linking: If you want URLs to reflect filters (for sharing/bookmarking), backend filtering is best.
 - Pagination, sorting, or search: These are usually best handled by the backend.
*/

const SidebarProductsComponent = ({
  toggleSidebar,
  sendStatusToParent = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [expandedAccordionData, setExpandedAccordionData] = useState(
    Array(accordionList.length).fill(null)
  );
  const toggleButtonRef = useRef(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    sendStatusToParent(false);
  };
  const accordionChangeHandler = (panelIdx) => (event, isExpanded) => {
    setExpandedAccordionData((prev) => ({
      ...prev,
      [panelIdx]: isExpanded,
    }));
  };

  useEffect(() => {
    setOpen(toggleSidebar);
  }, [toggleSidebar]);
  //   useEffect(() => {
  //     if (!open) {
  //       setAccordionExpanded(null);
  //     }
  //   }, [open]);
  // useEffect(() => {
  // }, [expandedAccordionData]);
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
      <div id="sidebar-menu" className="">
        {/* Material ui component we styling it by using sx = {{}} */}
        {sidebarProductTopicData &&
          sidebarProductTopicData.map((accordion, idx) => (
            /* transition for improve performance if accordion have nested data */
            <Accordion
              key={idx}
              expanded={!!expandedAccordionData[idx]}
              onChange={accordionChangeHandler(idx)}
              disableGutters
              sx={{
                marginBottom: "0.1rem",
                boxShadow: "none",
                position: "relative",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  expandedAccordionData[idx] ? (
                    <RemoveIcon
                      className="text-gray-400"
                      sx={{ width: "16px", height: "16px" }}
                    />
                  ) : (
                    <AddIcon
                      className="text-gray-400"
                      sx={{ width: "16px", height: "16px" }}
                    />
                  )
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h2 className="text-xl">{accordion}</h2>
              </AccordionSummary>
              <AccordionDetails>{accordionList[idx]}</AccordionDetails>
            </Accordion>
          ))}
      </div>
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
