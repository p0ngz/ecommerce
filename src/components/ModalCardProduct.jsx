import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
const ModalCardProduct = ({ toggleState, dataModal }) => {
  const [openModal, setOpenModal] = useState(false);
  const [color, setColor] = useState("Gold");
  const [product, setProduct] = useState(0);
  useEffect(() => {
    setOpenModal(toggleState);
  }, [toggleState, dataModal]);

  //   function
  const handleClose = () => setOpenModal(false);
  const decreaseHandler = () => {
    if (product > 0) {
      setProduct((prev) => prev - 1);
    }
  };
  const increaseHandler = () => {
    setProduct((prev) => prev + 1);
  };
  const colorPickerHandler = (color) => {
    setColor(color);
  };


  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white min-w-[50rem] h-[25rem] flex justify-center items-center rounded-md">
          <div id="left-modal" className="w-1/2 h-full">
            <img
              src={dataModal.imgSrc}
              alt={dataModal.titleProduct}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div
            id="right-modal"
            className="scrollbar-custom ps-10 pe-3 py-10 w-1/2 h-full flex flex-col items-start overflow-scroll scroll-smooth"
          >
            <div
              id="title-product"
              className="mb-5 title-product uppercase text-xl whitespace-nowrap"
            >
              {dataModal.titleProduct}
            </div>
            <div id="price-product" className="mb-5 flex gap-3 items-center">
              {dataModal.discount > 0 ? (
                <>
                  <div className="text-xl text-gray-400 line-through">
                    ${dataModal.price}
                  </div>
                  <div className="text-3xl" style={{ color: "#63512D" }}>
                    $
                    {dataModal.price -
                      (dataModal.price * dataModal.discount) / 100}
                  </div>
                </>
              ) : (
                <div>${dataModal.price}</div>
              )}
            </div>
            <hr className="mb-5 px-5 w-full text-gray-500 "></hr>
            <div
              id="description-product"
              className="mb-3 text-sm text-gray-500"
            >
              <p>
                Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio,
                ac pellentesque lacus. Pellentesque dapibus nunc nec est
                imperdiet, a malesuada sem rutrum
              </p>
            </div>
            <div id="color-product" className="mb-5">
              <div id="show-color" className="mb-3">
                Color: {color}
              </div>
              <div id="pick-color" className="flex gap-3">
                <div
                  onClick={() => colorPickerHandler("Silver")}
                  className={`rounded-full w-6 h-6 bg-gray-300 hover:cursor-pointer ${color==="Silver" ? 'border  border-gray-400' : null}`}
                ></div>
                <div
                  onClick={() => colorPickerHandler("Gold")}
                  className={`rounded-full w-6 h-6 bg-orange-200 hover:cursor-pointer ${color==="Gold" ? 'border border-orange-300' : null}`}
                ></div>
              </div>
            </div>
            <div
              id="stock-product"
              className="mb-5 flex gap-3 text-sm text-green-700"
            >
              <CheckCircleOutlinedIcon fontSize="small"></CheckCircleOutlinedIcon>
              <span>In Stock</span>
            </div>
            <div id="action-product" className="grid grid-cols-5 gap-5">
              <div
                id="amount-product"
                className="col-span-2 p-0 min-w-30 h-10 grid grid-cols-3 border border-gray-300"
              >
                <div
                  id="decrease-product"
                  className={`flex justify-center items-center hover:cursor-pointer ${
                    product <= 0 ? "pointer-events-none opacity-50" : ""
                  }`}
                  onClick={() => decreaseHandler()}
                >
                  -
                </div>
                <div
                  id="show-amount-product"
                  className="flex justify-center items-center  border-x-1 border-gray-300"
                >
                  {product}
                </div>
                <div
                  id="increase-product"
                  className="flex justify-center items-center hover:cursor-pointer "
                  onClick={() => increaseHandler()}
                  disabled={product <= 0}
                >
                  +
                </div>
              </div>
              <div
                id="add-to-cart"
                className="col-span-3 p-0 min-w-35 h-10 flex justify-center items-center rounded-sm"
              >
                <button className="w-full h-full bg-black text-white rounded-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCardProduct;
