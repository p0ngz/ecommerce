import React, { useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { sidebarProductTopicData } from "./sidebarProductTopic";
import CollectionTopic from "./CollectionTopic";
import AvailabilityTopic from "./AvailabilityTopic";
import PriceTopic from "./PriceTopic";
import ColorTopic from "./ColorTopic";
import SizeTopic from "./SizeTopic";

const accordionList = [
  <CollectionTopic />,
  <AvailabilityTopic />,
  <PriceTopic />,
  <ColorTopic />,
  <SizeTopic />,
];

const SidebarMenu = () => {
  const [expandedAccordionData, setExpandedAccordionData] = useState(
    Array(accordionList.length).fill(null)
  );
  const accordionChangeHandler = (panelIdx) => (event, isExpanded) => {
    setExpandedAccordionData((prev) => ({
      ...prev,
      [panelIdx]: isExpanded,
    }));
  };
  return (
    <div id="sidebar-menu" className="">
      {sidebarProductTopicData &&
        sidebarProductTopicData.map((accordion, idx) => (
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
  );
};

export default SidebarMenu;
