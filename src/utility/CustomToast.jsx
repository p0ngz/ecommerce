const CustomToast = ({ statusTxt, descriptionTxt, productImg, productName }) => {
  const text = `${statusTxt} ${productName} ${descriptionTxt}`;

  return (
    <div className="flex items-center gap-4 p-2 min-w-full">
      <img
        src={`${import.meta.env.VITE_ECOMMERCE_DOMAIN}${productImg}`}
        alt={productName}
        className="w-14 h-14 object-cover rounded"
      />

      <span className="text-sm">{text}</span>
    </div>
  );
};

export default CustomToast;
