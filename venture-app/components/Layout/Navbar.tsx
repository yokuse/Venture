import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";

export const APP_BAR_HEIGHT = "4.5rem";
const Navigationbar = () => {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let smallnavButtons = null;
  let bignavButtons = null;
  let bignavName = null;

  // show buttons if user does not exist
  if (user?.isLoggedIn === false) {
    smallnavButtons = (
      <div>
        <Link href="/account/login">
          <button className="bg-transparent text-indigo-600 px-8 py-3 mb-4">
            Log In
          </button>
        </Link>
      </div>
    );
  }

  if (user?.isLoggedIn === false) {
    bignavButtons = (
      <div>
        <Link href="/account/login">
          <button className="px-8 py-3"> Log In</button>
        </Link>
      </div>
    );
  }

  if (user?.isLoggedIn === true) {
    smallnavButtons = (
      <div>
        <p>
          Hello!
          <br />
          {user?.email} ({user?.email})
        </p>
        <button
          onClick={async (e) => {
            e.preventDefault();
            mutateUser(
              await fetchJson("/api/auth/logout", { method: "POST" }),
              false
            );
            router.push("/account/login");
          }}
          className="bg-transparent text-indigo-600 px-8 py-3 mb-4"
        >
          Logout
        </button>
        <button
          onClick={() => router.push("/portfolio")}
          className="px-8 py-3 text-white no-underline"
        >
          Portfolio
        </button>
      </div>
    );
  }

  if (user?.isLoggedIn === true) {
    bignavButtons = (
      <div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            mutateUser(
              await fetchJson("/api/auth/logout", { method: "POST" }),
              false
            );
            router.push("/account/login");
          }}
          className="border-none bg-transparent text-black mr-4"
        >
          Logout
        </button>
        <button
          onClick={() => router.push("/portfolio")}
          className="px-8 py-3 text-white"
        >
          Portfolio
        </button>
      </div>
    );
  }
  if (user?.isLoggedIn === true) {
    bignavName = (
      <div className="pl-8">
        <p>
          Welcome:
          {user?.email} ({user?.email})
        </p>
      </div>
    );
  }

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const handleClose = () => setNav(!nav);

  return (
    <div className="w-screen h-[80px] z-10 bg-zinc-200  drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl">
            <Link href="/">
              <a className="pl-6 text-black mr-4 no-underline" >
                VENTURE.
              </a>
              
            </Link>
          </h1>
          <ul className="hidden md:flex">
            <li>
              <Link href="/">Home</Link>
            </li>
            {user?.isLoggedIn &&<li><Link href="/raise" >Raise</Link></li> }
            <li>
              <Link href="/invest">Invest</Link>
            </li>
            <li>{bignavName}</li>
          </ul>
        </div>
        <div className="hidden md:flex pr-4">{bignavButtons}</div>
        <div className="md:hidden mr-4" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5" /> : <CloseIcon className="w-5" />}
        </div>
      </div>

      <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
        <li className="border-b-2 border-zinc-300 w-full">
          <Link href="/">
            <a onClick={handleClose}> Home</a>
          </Link>
        </li>
        {user?.isLoggedIn &&<li className='border-b-2 border-zinc-300 w-full'><Link href="/raise" ><a onClick={handleClose}> Raise</a></Link></li>}
        <li className="border-b-2 border-zinc-300 w-full">
          <Link href="/invest">
            <a onClick={handleClose}> Invest</a>
          </Link>
        </li>
        <div className="flex flex-col my-4">{smallnavButtons}</div>
      </ul>

      <h1></h1>
    </div>
  );
};

export default Navigationbar;
