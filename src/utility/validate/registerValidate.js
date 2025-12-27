import * as yup from "yup";

const firstNameRegex = /^[A-Za-z]+$/;
const lastNameRegex = /^[A-Za-z]+$/;
const usernameRegex = /^[A-Za-z0-9_]+$/;
const passwordRegex = /^[A-Z][A-Za-z0-9@_-]{4,9}$/;
export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(firstNameRegex, { message: "Invalid firstName( must be character or string)" })
    .min(2, "firstName must be at least 2 characters")
    .required("firstName is required"),
  lastName: yup
    .string()
    .matches(lastNameRegex, { message: "Invalid lastName (must be character or string)" })
    .min(2, "lastName must be at least 2 character2")
    .required("lastName is required"),
  username: yup
    .string()
    .required("Username is required")
    .matches(usernameRegex, { message: "Invalid Username (must be character or string)" }),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(10, "Password must be at most 10 characters")
    .matches(passwordRegex, {
      message: "Invalid Password (must start with an uppercase letter and include letters, numbers, @, _, -)",
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password not match")
    .required("Confirm Password is required"),
});
