import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { shippingAddressSchema } from "../utility/validate/shippingValidate";
import { useFormik } from "formik";
import { useShipping } from "../utility/context/shippingContext";
const AddressShipping = () => {
  const { setShippingAddress } = useShipping();
  const { values, errors, touched, handleBlur, handleChange, dirty, isValid } = useFormik({
    initialValues: {
      address: "",
      zipCode: "",
      tel: "",
      email: "",
    },
    validationSchema: shippingAddressSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (isValid && dirty) {
      setShippingAddress(values);
    }
  }, [values, isValid, dirty, setShippingAddress]);

  return (
    <div id="address-tel-shipping" className="mb-10 p-10 w-full h-auto  bg-[#f6f6f6] ">
      <div id="address-container">
        <p className="mb-5 font-semibold text-xl">Address:</p>
        <Box
          component="form"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", xl: "row" },
            gap: {
              xs: 3,
              xl: 2,
            },
          }}
          autoComplete="off"
        >
          <TextField
            id="address"
            name="address"
            label="address"
            variant="outlined"
            placeholder="Address"
            value={values.address}
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{ width: "100%", height: 56 }}
          />
          {touched.address && errors.address && (
            <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.address}</p>
          )}
          <TextField
            id="zipCode"
            name="zipCode"
            label="zipCode"
            variant="outlined"
            placeholder="Zip Code"
            value={values.zipCode}
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{ width: "100%", height: 56 }}
          />
          {touched.zipCode && errors.zipCode && (
            <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.zipCode}</p>
          )}
        </Box>
      </div>
      <div id="tel-container">
        <p className="my-5 font-semibold text-xl">Phone Number:</p>
        <Box component="form" sx={{ width: "100%" }} noValidate autoComplete="off">
          <TextField
            id="tel"
            name="tel"
            label="Phone Number"
            variant="outlined"
            placeholder="Phone Number"
            value={values.tel}
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{ width: "100%", height: 56 }}
          />
          {touched.tel && errors.tel && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.tel}</p>}
        </Box>
      </div>
      <div id="email-container">
        <p className="my-5 font-semibold text-xl">Email:</p>
        <Box component="form" sx={{ width: "100%" }} noValidate autoComplete="off">
          <TextField
            id="email"
            name="email"
            label="email"
            variant="outlined"
            placeholder="example@email.com"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            sx={{ width: "100%", height: 56 }}
          />
          {touched.email && errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1 ml-1">{errors.email}</p>}
        </Box>
      </div>
    </div>
  );
};

export default AddressShipping;
