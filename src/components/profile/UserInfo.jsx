import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import ChipCard from "../../utility/components/ChipCard";
import { colorChipCardFromRole } from "../../utility/colorChipCard";
import PlaceIcon from "@mui/icons-material/Place";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const UserInfo = ({
  firstName,
  lastName,
  nickName,
  img,
  status = "customer",
  address,
  zipCode,
  email,
  phone,
  regisDate,
}) => {
  const addressRef = useRef();
  const fullNameHandler = () => {
    if (firstName && lastName) {
      const fullName = firstName + " " + lastName;
      return fullName;
    }
  };
  const fullName = useMemo(fullNameHandler, [firstName, lastName]);
  useEffect(() => {}, []);
  useEffect(() => {
    console.log("addressRef: ", addressRef.current);
  }, [addressRef]);
  return (
    <div
      id="user-info-container"
      className="w-full h-full py-3 px-5 flex flex-col justify-center items-center gap-3"
    >
      <div id="user-img">
        <img src={img} alt={fullName} className="w-35 h-35 rounded-full" />
      </div>
      <div id="user-name">
        <h2 id="fullName" className="text-2xl">
          {fullName}{" "}
          {!!nickName && <span className="sm:ms-2 md:ms-3">({nickName})</span>}{" "}
        </h2>
      </div>
      <div id="user-status" className="flex justify-center items-center gap-2">
        {status.length > 1 ? (
          status.map((status, index) => {
            return (
              <ChipCard
                text={status}
                key={index}
                bgColor={colorChipCardFromRole(status)}
              />
            );
          })
        ) : (
          <ChipCard text={status} bgColor={colorChipCardFromRole(status)} />
        )}
      </div>
      <div
        id="user-contact"
        className="mt-3 text-md text-gray-400 flex flex-col gap-3 justify-center items-center "
      >
        <p
          id="user-address"
          className="number text-center gap-2"
          ref={addressRef}
        >
          <PlaceIcon fontSize="small" /> {address} {zipCode}
        </p>
        <p
          id="user-email"
          className="number text-start flex items-center gap-2"
        >
          <MailIcon fontSize="small" /> {email}
        </p>
        <p id="user-phone" className="number flex items-center gap-2">
          <LocalPhoneIcon fontSize="small" /> {phone}
        </p>
        <p className="number flex items-center gap-2">
          <CalendarMonthIcon fontSize="small" />{" "}
          {regisDate?.toLocaleDateString()}
        </p>
      </div>
      <div id="user-actions" className="mt-3 w-full h-auto grid grid-cols-2 gap-3">
        <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Edit Profile
        </button>
        <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
UserInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  nickName: PropTypes.string,
  img: PropTypes.string.isRequired,
  status: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
  regisDate: PropTypes.instanceOf(Date),
};
