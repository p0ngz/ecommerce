import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const collectionData = [
  {
    type: "Earrings",
    count: 8,
  },
  {
    type: "Necklaces",
    count: 6,
  },
  {
    type: "Rings",
    count: 8,
  },
  {
    type: "Bracelets",
    count: 17,
  },
  {
    type: "Pendants",
    count: 6,
  },
  {
    type: "Platinum Jewels",
    count: 8,
  },
];
const CollectionTopic = () => {
  const [collections, setCollections] = useState([]);
  const [showMoreOrLess, setShowMoreOrLess] = useState(true);

  const showMoreCollectionHandler = (state) => {
    setShowMoreOrLess(state);
    console.log("check state: ", state);
  };

  useEffect(() => {
    setCollections(collectionData);
  }, []);
  return (
    <>
      <ul className="list-none p-0 m-0 leading-[2] ">
        {collections?.length > 0 && collectionData.length <= 4
          ? collections.map((collection, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-400 hover:cursor-pointer hover:text-gray-600"
                >
                  {collection.type} ({collection.count})
                </li>
              );
            })
          : showMoreOrLess
          ? collections.slice(0, 4).map((collection, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-400 hover:cursor-pointer hover:text-gray-600"
                >
                  {collection.type} ({collection.count})
                </li>
              );
            })
          : collections.map((collection, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-400 hover:cursor-pointer hover:text-gray-600"
                >
                  {collection.type} ({collection.count})
                </li>
              );
            })}
        {collections.length > 4 ? (
          showMoreOrLess ? (
            <span
              className="mt-2 text-sm flex items-center hover:cursor-pointer "
              onClick={() => showMoreCollectionHandler(false)}
            >
              <AddIcon fontSize="small" /> View more
            </span>
          ) : (
            <span
              className="mt-2 text-sm flex items-center hover:cursor-pointer"
              onClick={() => showMoreCollectionHandler(true)}
            >
              <RemoveIcon fontSize="small" /> View Less
            </span>
          )
        ) : null}
      </ul>
    </>
  );
};

export default CollectionTopic;
