import * as yup from "yup";

const firstNameRegex = /^[A-Za-z]+$/;
const lastNameRegex = /^[A-Za-z]+$/;
const passwordRegex = /^[A-Z][A-Za-z0-9@_-]{4,9}$/;
export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(firstNameRegex, { message: "Invalid firstName" })
    .min(2, "firstName must be at least 2 characters")
    .required("firstName is required"),
  lastName: yup
    .string()
    .matches(lastNameRegex, { message: "Invalid lastName" })
    .min(2, "lastName must be at least 2 character2")
    .required("lastName is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .matches(passwordRegex, { message: "Invalid Password" })
    .min(5, "Password must be at least 5 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password not match")
    .required("Confirm Password is required"),
});
