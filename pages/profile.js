import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React from "react";
import { ShinyBox } from "../components/Boxes";
import { Button } from "../components/Button";
import { Hamburger } from "../components/Hamburger";
import { HR } from "../components/HR";
import clientPromise from "../lib/mongodb";
import { sessionOptions } from "../lib/session";
import { List } from "../components/List";
import Link from "next/link";
import { presaleData } from "./api/presale";
import { Footer } from "../components/Footer";

const Title = ({ children, className = "" }) => (
  <div
    className={
      "text-center font-akira text-4xl flex flex-col justify-center items-center text-vwhite min-w-full " +
      className
    }
  >
    {children}
    <HR />
  </div>
);

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (!req.session.user) {
      return {
        props: {
          loggedIn: false,
        },
      };
    }

    const client = await clientPromise;
    const col = client.db(process.env.MONGODB_DB).collection("users");
    const user = await col.findOne({ email: req.session.user.email });

    const { endCounterTime } = presaleData;
    let totalSeconds = (endCounterTime.getTime() - new Date().getTime()) / 1000;

    const days = Math.floor(totalSeconds / (24 * 60 * 60));

    req.session.user = {
      isLoggedIn: true,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      reserved: user.reserved,
    };
    await req.session.save();

    return {
      props: {
        user: req.session.user,
        loggedIn: true,
        days: days,
      },
    };
  },
  sessionOptions
);

export default function Profile({ user, loggedIn, days }) {
  const adders = [100, 500, 1000, 5000, 10000, 50000, 100000];
  const [addIndex, setAddIndex] = React.useState(2);
  const [amount, setAmount] = React.useState(1000);
  const [status, setStatus] = React.useState(200);
  const [error, setError] = React.useState("");
  const [dropdown, setDropdown] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  });

  return (
    <div className="flex flex-col bg-nogif min-w-full justify-center align-top">
      <Hamburger />
      <Title className="mt-[4rem]">Profile</Title>
      {user.reserved === 0 ? (
        <ShinyBox className="min-w-full m-[1rem]">
          <p className="text-vwhite text-center font-vice min-w-full text-2xl">
            CBT is coming in <span className="text-vstolenpurple">{days}</span>{" "}
            days
          </p>
          <p className="text-vwhite text-center font-vice min-w-full text-2xl">
            but
          </p>
          <p className="text-xl font-sans text-vwhite text-center mt-1">
            You can reserve tokens and get
            <span className="underline font-semibold"> early access</span> to
            the pre-sale at $0.05 USD/CBT.
          </p>
          <div className="flex flex-col justify-center min-w-full rounded bg-vgray my-2">
            <div
              className="flex flex-row justify-between min-w-full pl-3 p-2 items-center "
              onClick={() => setDropdown(!dropdown)}
            >
              <p className="font-vice text-xl text-vwhite"> What do I get?</p>
              <FontAwesomeIcon
                icon={dropdown ? faAngleUp : faAngleDown}
                color="#F5F0F6"
              />
            </div>
            {dropdown ? (
              <>
                <div className="flex flex-row justify-center min-w-full">
                  <div className="min-w-[90%] bg-vstolenpurple h-[1px]"></div>
                </div>
                <div className="flex flex-col justify-start  bg-vgray rounded p-4">
                  <p className="text-vwhite font-sans text-sm">
                    Want to get your CBTs before anyone else? Tell us how many
                    tokens you would like to own, and we will save them for you.
                    No payment is required. They will be exclusively available
                    to you for three day before the presale. You can claim them
                    at any time during this period.
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <p className="text-lg font-vice text-vwhite text-center">
            How many tokens do you want to reserve?
          </p>
          <div className="flex flex-row justify-center items-center">
            <button
              className="mt-2 mx-2 bg-gradient-to-r from-vstolenpurple via-vstolenorange to-vstolenblue rounded-full background-gradient-animate drop-shadow-xl box-glow-vpurple w-[2rem] h-[2rem] flex flex-col justify-center"
              onClick={() => {
                if (amount == 100) return;
                if (!adders.includes(amount)) {
                  let stop;
                  for (let i = 0; i < adders.length; i++) {
                    if (adders[i] < amount) {
                      stop = adders[i];
                    } else {
                      break;
                    }
                    setAmount(stop);
                  }
                } else {
                  if (addIndex > 0) {
                    setAddIndex(addIndex - 1);
                    setAmount(adders[addIndex - 1]);
                  } else {
                    setAmount(adders[addIndex]);
                  }
                }
              }}
            >
              <div className="rounded w-full h-full text-vblack font-akira tweaky-text flex flex-col justify-center">
                -
              </div>
            </button>
            <input
              required
              type="number"
              id="amount"
              name="amount"
              className="rounded box-glow-vpurple bg-vbetgray text-vwhite p-2 mt-2 text-center"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
            />
            <button
              className="mt-2 mx-2 bg-gradient-to-r from-vstolenpurple via-vstolenorange to-vstolenblue rounded-full background-gradient-animate drop-shadow-xl box-glow-vpurple w-[2rem] h-[2rem] flex flex-col justify-center"
              onClick={() => {
                if (amount == 100000) return;
                if (!adders.includes(amount)) {
                  let stop;
                  for (let i = adders.length - 1; i >= 0; i--) {
                    if (adders[i] > amount) {
                      stop = adders[i];
                    } else {
                      break;
                    }
                    setAmount(stop);
                  }
                } else {
                  if (addIndex < adders.length) {
                    setAddIndex(addIndex + 1);
                    setAmount(adders[addIndex + 1]);
                  } else {
                    setAmount(adders[addIndex]);
                  }
                }
              }}
            >
              <div className="rounded w-full h-full text-vblack font-akira tweaky-text flex flex-col justify-center">
                +
              </div>
            </button>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-md font-sans text-vwhite text-center mt-1">
              Maximum of: 100,000
            </p>
            {status !== 200 ? (
              <div className="flex flex-row justify-center min-w-full p-1 mt-2 bg-red-400 rounded">
                <p className="min-w-full p-1 text-vwhite">{error}</p>
              </div>
            ) : (
              <></>
            )}
            <div className="flex flex-row justify-center  mt-6">
              <Button
                text="RESERVE"
                className="text-2xl w-[10rem]"
                onClick={async () => {
                  const JSONdata = JSON.stringify({ amount: parseInt(amount) });
                  const endpoint = "/api/reserve";

                  const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSONdata,
                  };

                  const response = await fetch(endpoint, options);

                  if (response.status === 200) {
                    setStatus(200);
                    router.replace(router.asPath);
                  } else {
                    const result = await response.json();
                    setStatus(400);
                    setError(result.error);
                  }
                }}
              />
            </div>
          </div>
        </ShinyBox>
      ) : (
        <ShinyBox className="min-w-full m-[1rem]">
          <p className="text-vwhite text-center font-vice min-w-full text-2xl">
            You have reserved:
          </p>
          <p className="text-vstolenpurple text-center font-vice min-w-full text-2xl">
            {user.reserved} CBT
          </p>
          <div className="flex flex-col justify-center min-w-full rounded bg-vgray my-2">
            <div
              className="flex flex-row justify-between min-w-full pl-3 p-2 items-center "
              onClick={() => setDropdown(!dropdown)}
            >
              <p className="font-vice text-xl text-vwhite"> What do I get? </p>
              <FontAwesomeIcon
                icon={dropdown ? faAngleUp : faAngleDown}
                color="#F5F0F6"
                onClick={() => setDropdown(!dropdown)}
              />
            </div>
            {dropdown ? (
              <>
                <div className="flex flex-row justify-center min-w-full">
                  <div className="min-w-[90%] bg-vstolenpurple h-[1px]"></div>
                </div>
                <div className="flex flex-col justify-start  bg-vgray rounded p-4">
                  <p className="text-vwhite font-sans text-sm">
                    The reserved CBTs will be exclusively available to you for
                    three days before the presale. By purchasing the CryptoBet
                    token you get access to:
                    <List>
                      <>
                        Passive Yield derived from the profitability of the DAO
                      </>
                      <>Cashback on multiple of the games in the platform</>
                      <>
                        Additional bonuses, rewards in crypto, discounts, and
                        better rates
                      </>
                      <>
                        Access to the owners&apos; collection of limited edition
                        NFTs (see roadmap)
                      </>
                      <>
                        Access to exclusive events, poker tournaments, parties,
                        and more
                      </>
                    </List>
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </ShinyBox>
      )}
      <div className="flex flex-col min-w-full">
        <p className="font-akira text-vwhite text-xl ml-6">Settings</p>
        <Link href="/changepassword">
          <a className="noselect ml-6 mt-2">
            <Button className="min-w-[10rem] px-2" text="Change Password" />
          </a>
        </Link>
      </div>
      <Footer className="absolute bottom-0" />
    </div>
  );
}
