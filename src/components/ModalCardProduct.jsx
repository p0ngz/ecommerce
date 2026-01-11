import React, { useEffect, useState, memo, useMemo } from "react";
import Modal from "@mui/material/Modal";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { themeColor } from "../utility/color";
import { useCartStore } from "../store/cart/cartsStore";
import { useShallow } from "zustand/shallow";

const ModalCardProduct = ({ toggleState, dataModal }) => {
  const [openModal, setOpenModal] = useState(false);
  const [chooseColor, setChooseColor] = useState(null);
  const [chooseSize, setChooseSize] = useState(null);
  const [quantityProduct, setQuantityProduct] = useState(0);

  const sizes = useMemo(() => {
    const filterFromColor = dataModal.variants.filter((variant) => variant.color === chooseColor);
    return filterFromColor.map((variant) => variant.size);
  }, [chooseColor, dataModal.variants]);
  const quantity = useMemo(() => {
    if (chooseSize && chooseColor) {
      const quantityFromSizeAndColor = dataModal.variants.find(
        (variant) => variant.color === chooseColor && variant.size === chooseSize
      );
      return quantityFromSizeAndColor.inStock;
    }
  }, [chooseSize, chooseColor, dataModal.variants]);
  const [inStock, setInStock] = useState(0);
  const { createOrUpdateCartListByUserId } = useCartStore(
    useShallow((state) => {
      return {
        createOrUpdateCartListByUserId: state.createOrUpdateCartListByUserId,
      };
    })
  );
  const colors = useMemo(() => {
    if (dataModal.variants && dataModal.variants.length > 0) {
      // setChooseColor(dataModal.variants[0].color);
      // setInStock(dataModal.variants[0].inStock);
      return [...new Set(dataModal.variants.map((variant) => variant.color))];
    }
  }, [dataModal]);

  //   function
  const handleClose = () => {
    setOpenModal(false);
    setChooseColor(null);
    setChooseSize(null);
    setQuantityProduct(0);
  };
  const decreaseHandler = () => {
    if (quantityProduct > 0) {
      setQuantityProduct((prev) => prev - 1);
    }
  };
  const increaseHandler = () => {
    setQuantityProduct((prev) => prev + 1);
  };
  const colorPickerHandler = (color) => {
    setChooseColor(color);

    // check stock from color
    const quantity = dataModal.variants.find((variant) => variant.color === color).inStock;
    setInStock(quantity);
  };
  const chooseSizeHandler = (size) => {
    setChooseSize(() => size);
  };
  useEffect(() => {
    setOpenModal(toggleState);
  }, [toggleState, dataModal]);
  useEffect(() => {}, [quantityProduct]);
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="p-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[70%] sm:min-w-[45rem] min-h-[25rem] max-h-[80vh] sm:min-h-[25rem]  2xl:w-[50%] 2xl:h-[60%] flex flex-col sm:flex-row sm:justify-center sm:items-center rounded-md ">
          <div id="left-modal" className="w-full sm:w-1/2 h-[20%] sm:h-full">
            <img
              src={`${import.meta.env.VITE_ECOMMERCE_DOMAIN}${dataModal.productImg}`}
              alt={dataModal.productName}
              className="w-full h-70 sm:h-full object-cover rounded-md"
            />
            {dataModal?.discount !== 0 && (
              <div
                id="discount"
                className="absolute w-10 h-5 text-xs text-center top-2 left-2 sm:w-auto sm:h-auto sm:px-5 sm:py-2 sm:text-md sm:top-4 sm:left-4 z-2  py-1 bg-destructive rounded text-gray-100"
              >
                -{dataModal?.discount}%
              </div>
            )}
          </div>
          <div
            id="right-modal"
            className="scrollbar-x-custom scrollbar-y-custom p-4 sm:ps-10 sm:pe-3  w-full sm:w-1/2 sm:h-full flex flex-col items-start 2xl:justify-center 2xl:gap-5 overflow-scroll scroll-smooth"
          >
            <div id="title-product" className="mb-5 title-product uppercase text-xl whitespace-nowrap 2xl:mb-0">
              {dataModal?.productName}
            </div>
            <div id="price-product" className="mb-5 flex gap-3 items-center">
              {dataModal?.discount > 0 ? (
                <>
                  <div className="text-xl text-gray-400 line-through">${dataModal.price}</div>
                  <div className="text-3xl" style={{ color: "#63512D" }}>
                    ${(dataModal?.price - (dataModal?.price * dataModal?.discount) / 100).toFixed(2)}
                  </div>
                </>
              ) : (
                <div>${dataModal?.price.toFixed(2)}</div>
              )}
            </div>
            <hr className="mb-5 px-5 w-full text-gray-500 "></hr>
            <div id="description-product" className="mb-3 text-sm text-gray-500">
              <p>{dataModal?.description}</p>
            </div>
            <div id="color-product" className="mb-5">
              <div id="show-color" className="mb-3">
                Color: {chooseColor || "Select a color..."}
              </div>
              <div id="pick-color" className="flex gap-3">
                {colors &&
                  colors.map((color) => {
                    const colorFormat = themeColor[color.toLowerCase()];
                    return (
                      <div
                        key={color}
                        className="rounded-full w-6 h-6 md:w-8 md:h-6 hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                        style={{
                          backgroundColor: colorFormat?.bg || "#cccccc",
                          border: `1px solid ${colorFormat?.border || "#999999"}`,
                          outline: `${color === chooseColor ? `2px solid ${colorFormat?.ring}` : "none"}`,
                        }}
                        title={color}
                        onClick={() => colorPickerHandler(color)}
                      ></div>
                    );
                  })}
              </div>
            </div>
            {chooseColor && (
              <div id="sizes-product" className="mb-5">
                <div id="show-size" className="mb-3">
                  Size: {chooseSize || "Select a size..."}
                </div>
                <div id="pick-size" className="flex gap-3 flex-wrap">
                  {chooseColor &&
                    sizes.length > 0 &&
                    sizes.map((sizeItem) => {
                      const isSelected = sizeItem === chooseSize;
                      return (
                        <div
                          key={sizeItem}
                          id="size-product"
                          className={`
                          min-w-[2.5rem] px-3 py-2 text-center text-sm font-medium
                          rounded-md border-2 cursor-pointer
                          transition-all duration-200
                          hover:scale-105 hover:shadow-md
                          ${
                            isSelected
                              ? "bg-black text-white border-black shadow-md"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }
                        `}
                          onClick={() => chooseSizeHandler(sizeItem)}
                        >
                          {sizeItem}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {chooseColor && chooseSize && (
              <div
                id="stock-product"
                className={`mb-5 flex gap-3 text-sm ${inStock > 0 ? "text-green-700" : "text-red-700"}`}
              >
                {inStock > 0 ? (
                  <>
                    <CheckCircleOutlinedIcon fontSize="small"></CheckCircleOutlinedIcon>
                    <p>
                      In Stock (<span className="number">{quantity}</span>)
                    </p>
                  </>
                ) : (
                  <>
                    <CancelIcon fontSize="small"></CancelIcon>
                    <span>Out of Stock</span>
                  </>
                )}
              </div>
            )}

            <div id="action-product" className="grid grid-cols-5 gap-10 sm:gap-5">
              <div id="amount-product" className="col-span-2 p-0 min-w-30 h-10 grid grid-cols-3 border border-gray-300">
                <div
                  id="decrease-product"
                  className={`flex justify-center items-center  ${
                    quantityProduct <= 0 ? "pointer-events-none opacity-25" : "hover:cursor-pointer"
                  }`}
                  onClick={() => decreaseHandler()}
                >
                  -
                </div>
                <div id="show-amount-product" className="flex justify-center items-center  border-x-1 border-gray-300">
                  {quantityProduct}
                </div>
                <div
                  id="increase-product"
                  className={`flex justify-center items-center  ${
                    sizes && quantityProduct >= quantity ? "pointer-events-none opacity-25" : "hover:cursor-pointer"
                  }`}
                  onClick={() => increaseHandler()}
                >
                  +
                </div>
              </div>
              <div
                id="add-to-cart"
                className="col-span-3 p-0 min-w-35 h-10 flex justify-center items-center rounded-sm"
              >
                <button className="w-full h-full bg-black text-white rounded-sm">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCardProduct;
