import React from "react";
import { Formik, Field } from "formik";
import { InputField } from "../../components/fields/InputField";
import * as Yup from "yup";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import zxcvbnEnPackage from "@zxcvbn-ts/language-en";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required")
    .matches(/^(?=.*[a-zA-Z])(?=.*\s)?[a-zA-Z\s]+$/, "Only alphabets!"),
  lastName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required")
    .matches(/^(?=.*[a-zA-Z])(?=.*\s)?[a-zA-Z\s]+$/, "Only alphabets!"),
  email: Yup.string().email("Invalid email").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Minimum eight characters!")
    .max(25, "Too complex!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\%\^\&\*])[a-zA-Z\d\w\!\@\#\%\^\&\*]+$/,
      "At least one uppercase, lowercase, number, and special character only from !@#%^&*"
    )
    .required("Required")
    .test("validate-passwd", "", (data, { createError }: any) => {
      if (!data) return false;

      const options = {
        translations: zxcvbnEnPackage.translations,
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
        dictionary: {
          ...zxcvbnCommonPackage.dictionary,
          ...zxcvbnEnPackage.dictionary,
        },
      };

      zxcvbnOptions.setOptions(options);
      if (data != null) {
        const result = zxcvbn(data);
        if (
          result.guessesLog10 < 8 &&
          result.guesses < 100000000 &&
          result.score < 3
        ) {
          return createError({
            message:
              `Password too simple!\nPassword strength: ` +
              result.score +
              " / 4",
          });
        } else {
          return true;
        }
      }
    }),
});

export type AccountProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// call api to update db with account
async function register(account: AccountProps) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(account),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

const RegisterPage = () => {
  const router = useRouter();
  let emailExists = false;
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (data) => {
        try {
          const { confirmPassword: _, ...cleanData } = data;
          const response = await register(cleanData);
          if (response === "Email already exists") emailExists = true;
          else {
            emailExists = false;
            router.push("/account/check-email");
          }
        } catch (err) {}
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <div className="flex justify-center p-2 mx-auto my-10 shadow-lg w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center ">
              <AccountCircleIcon className="text-indigo-600 text-6xl" />
            </div>
            <div className="flex justify-center ">
              <h1>Register</h1>
            </div>
            <label className="mr-4 text-2xl pt-6">
              First Name:
              <br />
              <Field
                name="firstName"
                placeholder="first name"
                type="text"
                component={InputField}
              />
            </label>
            <br />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}

            <label className="mr-4 text-2xl pt-6">
              Last Name:
              <br />
              <Field
                name="lastName"
                placeholder="last name"
                type="text"
                component={InputField}
              />
            </label>
            <br />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}

            <label className="mr-4 text-2xl pt-6">
              Email:
              <br />
              <Field
                name="email"
                placeholder="email"
                type="email"
                component={InputField}
              />
            </label>
            <br />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label className="mr-4 text-2xl pt-6">
              Password:
              <br />
              <Field
                name="password"
                placeholder="password"
                type="password"
                component={InputField}
              />
            </label>
            <br />
            <br />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <label className="mr-4 text-2xl pt-6">
              Confirm Password:
              <br />
              <Field
                name="confirmPassword"
                placeholder="password"
                type="password"
                component={InputField}
              />
            </label>
            <br />
            <br />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}

            <div className="flex justify-center">
              <button
                className=" rounded px-44 py-2 bg-indigo-600 mt-10 mb-5 "
                type="submit"
              >
                Register
              </button>
            </div>
            {emailExists && (
              <div>Email already in use, please try another email.</div>
            )}
          </form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterPage;
