import React, { useState } from "react";
import { Formik, Field } from "formik";
import { InputField } from "../../components/fields/InputField";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "../../lib/fetchJson";
import useUser from "../../lib/useUser";
import { KeyedMutator } from "swr";
import { User } from "../api/auth/user";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import type { GetServerSideProps } from "next";
import Link from "next/link";

type Props = {
  csrfToken: string;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const csrfToken = res.getHeader("x-csrf-token");
  return { props: { csrfToken } };
};

async function login(
  data: any,
  mutateUser: KeyedMutator<User>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    mutateUser(
      await fetchJson("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    );
  } catch (error) {
    if (error instanceof FetchError) {
      setErrorMsg(error.data.message);
    } else {
      console.error("An unexpected error happened: ", error);
    }
  }
}

const FormPage: React.FunctionComponent<Props> = ({ csrfToken }) => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        mfa: "",
        csrf_token: csrfToken,
      }}
      onSubmit={async (data) => {
        try {
          const response = await login(data, mutateUser, setErrorMsg);
          setErrorMsg("");
        } catch (err) {
          setErrorMsg("Invalid Login");
        }
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <div className="flex justify-center p-2 mx-auto my-10 shadow-lg w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center ">
              <LockOpenIcon className="text-indigo-600 text-6xl" />
            </div>
            <div className="flex justify-center ">
              <h1>Login</h1>
            </div>
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
            <label className="mr-4 text-2xl pt-6">
              2FA pin:
              <br />
              <Field name="mfa" placeholder="mfa" component={InputField} />
            </label>
            <label className="mr-4 text-2xl pt-6">
              <Field
                name="csrf_token"
                type="hidden"
              />
            </label>
            <div className="flex justify-center">
              <button
                className=" rounded px-44 py-2 bg-indigo-600 mt-10 mb-5 "
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="flex justify-center">
              No account on venture? &nbsp;
              <Link href="/account/register"> Register now</Link>
            </div>
            <br></br>
            {errorMsg}
          </form>
        </div>
      )}
    </Formik>
  );
};

export default FormPage;