import React from "react";
import UserInfo from "./UserInfo";
import UserActivity from "./UserActivity";

const userData = {
  name: {
    firstName: "Pongsatorn",
    lastName: "Tassaro",
    nickName: "Nae",
    fullName: () => {
      return userData.name.firstName + " " + userData.name.lastName;
    },
  },
  img: "src/assets/img/nae.jpg",
  status: ["customer", "member", "admin"],
  contact: {
    address: "366/1 Soit Krungthonburi 6 BanglumpooLang Krongsarn Bangkok",
    zipCode: "10600",
    email: "pongsatornnea@gmail.com ",
    phone: "0935791490",
  },
  registerDate: new Date(),
};

const ProfileComponent = () => {
  return (
    <div
      id="profile-container"
      className="w-full min-h-screen sm:py-20 xl:py-25 flex flex-col justify-center gap-5 items-center overflow-y-auto lg:bg-gray-100"
    >
      <UserInfo
        firstName={userData.name.firstName}
        lastName={userData.name.lastName}
        nickName={userData.name.nickName}
        img={userData.img}
        status={userData.status}
        address={userData.contact.address}
        zipCode={userData.contact.zipCode}
        email={userData.contact.email}
        phone={userData.contact.phone}
        regisDate={userData.registerDate}
      />

      <UserActivity />
    </div>
  );
};

export default ProfileComponent;
