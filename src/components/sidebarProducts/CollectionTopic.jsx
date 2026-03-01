import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";

const CollectionTopic = () => {
  const navigate = useNavigate();
  const { getTypeProduct } = useProductStore(
    useShallow((state) => ({
      getTypeProduct: state.getTypeProduct,
    }))
  );
  const [collections, setCollections] = useState([]);
  const [showMoreOrLess, setShowMoreOrLess] = useState(true);

  const showMoreCollectionHandler = (state) => {
    setShowMoreOrLess(state);
  };
  const filteredHandler = (filterData) => {
    const typeLower = filterData.toLowerCase();
    navigate(`/products/${typeLower}`);
  };
  const getTypeProductDataHandler = useCallback(async () => {
    const typeProducts = await getTypeProduct();
    if (typeProducts && typeProducts.length > 0) {
      setCollections(typeProducts);
    }
  }, [getTypeProduct]);

  useEffect(() => {
    getTypeProductDataHandler();
  }, [getTypeProductDataHandler]);

  return (
    <>
      <ul className="list-none p-0 m-0 leading-[2] ">
        {collections?.length > 0
          ? collections.map((collection, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-400 hover:cursor-pointer hover:text-gray-600"
                  onClick={() => filteredHandler(collection.type)}
                >
                  {collection.type} ({collection.total})
                </li>
              );
            })
          : showMoreOrLess
            ? collections.slice(0, 4).map((collection, idx) => {
                return (
                  <li
                    key={idx}
                    className="text-gray-400 hover:cursor-pointer hover:text-gray-600"
                    onClick={() => filteredHandler(collection.type)}
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
                    onClick={() => filteredHandler(collection.type)}
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
