import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useUserInfo } from "../contexts/userInfoContext";
const AddressShipping = () => {
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const { setFormDataUser } = useUserInfo();
  const addressHandler = (val) => {
    setAddress(val);
  };
  const zipCodeHandler = (val) => {
    setZipCode(val);
  };
  const telHandler = (val) => {
    setTel(val);
  };
  const emailHandler = (val) => {
    setEmail(val);
  };
  useEffect(() => {
    // validate here
  }, [zipCode]);
  useEffect(() => {
    // validate here
  }, [tel]);
  useEffect(() => {
    // validate here
  }, [email]);

  useEffect(() => {
    const userInfo = {
      address,
      zipCode,
      tel,
      email,
    };
    setFormDataUser(userInfo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, zipCode, tel, email]);

  return (
    <div
      id="address-tel-shipping"
      className="mb-10 p-10 w-full h-auto  bg-[#f6f6f6] "
    >
      <div id="address">
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
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            placeholder="Address."
            value={address}
            required
            onChange={(e) => addressHandler(e.target.value)}
            sx={{ width: "100%", height: 56 }}
          />
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            placeholder="Zip Code."
            required
            value={zipCode}
            onChange={(e) => zipCodeHandler(e.target.value)}
            sx={{ width: "100%", height: 56 }}
          />
        </Box>
      </div>
      <div id="tel">
        <p className="my-5 font-semibold text-xl">Phone Number:</p>
        <Box
          component="form"
          sx={{ width: "100%" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            placeholder="Phone Number."
            value={tel}
            required
            onChange={(e) => telHandler(e.target.value)}
            sx={{ width: "100%", height: 56 }}
          />
        </Box>
      </div>
      <div id="email">
        <p className="my-5 font-semibold text-xl">Email:</p>
        <Box
          component="form"
          sx={{ width: "100%" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            placeholder="example@email.com"
            value={email}
            required
            onChange={(e) => emailHandler(e.target.value)}
            sx={{ width: "100%", height: 56 }}
          />
        </Box>
      </div>
    </div>
  );
};

export default AddressShipping;
