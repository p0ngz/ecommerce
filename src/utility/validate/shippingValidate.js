import * as yup from "yup";

export const shippingAddressSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  zipCode: yup.string().required("Zip Code is required"),
  tel: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .required("Phone number is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
});
