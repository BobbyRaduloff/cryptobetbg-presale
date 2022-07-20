import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import { Button } from "./Button";

export const Navbar = ({ className = "" }) => {
  const router = useRouter();

  const NLink = ({ href, title, newTab = false }) => (
    <Link href={href}>
      <a className="no-select" target={newTab ? "_blank" : ""}>
        <p className="text-vwhite font-akira text-[0.6] mx-4">{title}</p>
      </a>
    </Link>
  );

  const UserButton = ({ href, title }) => (
    <Link href={href}>
      <a className="flex flex-col justify-center">
        <Button text={title} className="min-w-[10rem] text-sm mx-2" />
      </a>
    </Link>
  );

  const { user } = useUser({});

  return (
    <div className={"min-w-full mt-4 " + className}>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start items-center ml-4">
          <NLink href="/" title="Home" />
          <NLink href="/profile" title="Profile" />
          <NLink href="https://t.me/+szz6qkGwgpExMzM0" title="Community" />
          <NLink href="/litepaper.pdf" title="Litepaper" newTab />
          <NLink href="/tc" title="T &amp; C" />
        </div>
        <div className="flex flex-row justify-end items-center mr-16">
          {!user || !user.isLoggedIn ? (
            <>
              {!router.asPath.includes("login") ? (
                <UserButton href="/login" title="Log In" />
              ) : (
                <></>
              )}
              {!router.asPath.includes("register") ? (
                <UserButton href="/register" title="Register" />
              ) : (
                <></>
              )}
            </>
          ) : (
            <UserButton href="/logout" title="Log Out" />
          )}
        </div>
      </div>
    </div>
  );
};
