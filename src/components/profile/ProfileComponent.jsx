import { useState, useEffect, useCallback } from "react";
import UserInfo from "./UserInfo";
import UserActivity from "./UserActivity";
import { ToastContainer } from "react-toastify";
import { useUserStore } from "../../store/user/userStore";
import { useShallow } from "zustand/shallow";
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
  const [user, setUser] = useState(null);
  const { getUserByUserId } = useUserStore(
    useShallow((state) => {
      return {
        getUserByUserId: state.getUserByUserId,
      };
    })
  );
  const getUserByUserIdHandler = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const fetchedUser = await getUserByUserId(userId);
      setUser(fetchedUser);
    }
    const user = await getUserByUserId(userId);
    console.log("user: ", user);
    setUser(user);
  }, [getUserByUserId]);
  useEffect(() => {
    getUserByUserIdHandler();
  }, [getUserByUserIdHandler]);
  return (
    <div
      id="profile-container"
      className="w-full min-h-screen sm:py-20 xl:py-25 flex flex-col justify-center gap-5 items-center overflow-y-auto lg:bg-gray-100"
    >
      {user && (
        <UserInfo
          firstName={user?.information?.firstName}
          lastName={user?.information?.lastName}
          nickName={user?.information?.nickName}
          img={user?.information?.userImage}
          roles={user?.role}
          address={user?.information?.address}
          zipCode={user?.information?.zipCode}
          email={user?.email}
          phone={user?.information?.phone}
          regisDate={user?.createdAt}
        />
      )}

      <UserActivity />
      <ToastContainer position="top-right" autoClose={2000} closeOnClick />
    </div>
  );
};

export default ProfileComponent;
