import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import useUser from "../lib/useUser";
import { Button } from "./Button";
import { HR } from "./HR";

export const Hamburger = ({ className = "" }) => {
  const [isOpen, setOpen] = React.useState(false);

  const HLink = ({ href, title, newTab = false }) => (
    <Link href={href}>
      <a className="no-select" target={newTab ? "_blank" : ""}>
        <div className="mt-4">
          <p className="text-vwhite font-akira text-xl pl-8">{title}</p>
          <HR />
        </div>
      </a>
    </Link>
  );

  const { user } = useUser({});

  return (
    <div className={"min-w-full " + className}>
      {isOpen ? (
        <div className="fixed top-0 left-0 min-w-screen w-screen min-h-[300vh] max-h-[300vh] bg-[#131313] z-[5]">
          <FontAwesomeIcon
            icon={faTimes}
            color="#F5F0F6"
            className="ml-8 mt-4"
            size="2x"
            onClick={() => setOpen(false)}
          />
          <div className="flex flex-col justify-start mt-4">
            <HLink href="/" title="Home" />
            <HLink href="#" title="Play (COMING SOON)" />
            <HLink href="/profile" title="Profile" />
            <HLink href="https://t.me/+szz6qkGwgpExMzM0" title="Community" />
            <HLink href="/litepaper.pdf" title="Litepaper" newTab />
            <HLink href="/tc" title="T &amp; C" />
          </div>
          <div className="flex flex-row justify-around mt-4">
            {!user.isLoggedIn ? (
              <>
                <Link href="/login">
                  <a>
                    <Button text="Log In" className="min-w-[10rem] text-lg" />
                  </a>
                </Link>
                <Link href="/register">
                  <a>
                    <Button text="Register" className="min-w-[10rem] text-lg" />
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/logout">
                  <a>
                    <Button text="Log Out" className="min-w-[10rem] text-lg" />
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="min-w-full justify-start flex flex-row bg-[#13131377] drop-shadow pl-8 fixed top-0 z-[4] py-4">
          <FontAwesomeIcon
            icon={faBars}
            color="#F5F0F6"
            className=""
            size="2x"
            onClick={() => setOpen(true)}
          />
        </div>
      )}
    </div>
  );
};
