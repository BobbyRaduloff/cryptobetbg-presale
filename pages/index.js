import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import token_angle from "../public/token.png";
import polygon_logo from "../public/polygon.svg";
import telegram_logo from "../public/telegram.svg";
import github_logo from "../public/github.svg";
import token_logo from "../public/token_front.png";
import email_logo from "../public/email.svg";
import nownodes_logo from "../public/nownodes.png";
import ybit_logo from "../public/ybit.png";
import { ShinyBox, Box } from "../components/Boxes";
import { Timer } from "../components/Timer";
import { Button } from "../components/Button";
import { Subtitle } from "../components/Subtitle";
import chip from "../public/chip.png";
import { Hamburger } from "../components/Hamburger";
import useSWR from "swr";
import { Footer } from "../components/Footer";
import { List } from "../components/List";
import { useIsLarge } from "../lib/useWindowDimensions";
import { Navbar } from "../components/Navbar";

const WhatYouGet = () => {
  const Bullet = ({ children }) => (
    <p className="text-lg text-vwhite lg:text-2xl">{children}</p>
  );

  const isLarge = useIsLarge();

  return (
    <div className="flex flex-col min-w-full lg:min-w-[50%] justify-start min-h-full mt-4 lg:mt-0">
      <div className="min-w-full flex flex-col justify-center mb-2">
        <p className="ml-4 font-semibold text-2xl text-vwhite text-center font-akira">
          What you get
        </p>
      </div>

      <ShinyBox>
        <List>
          <Bullet>
            Passive Yield derived from the profitability of the DAO
          </Bullet>
          <Bullet>Cashback on multiple of the games in the platform</Bullet>
          <Bullet>
            Additional bonuses, rewards in crypto, discounts, and better rates
          </Bullet>
          <Bullet>
            Access to the owners&apos; collection of limited edition NFTs (see
            roadmap)
          </Bullet>
          <Bullet>
            Access to exclusive events, poker tournaments, parties, and more
          </Bullet>
        </List>
      </ShinyBox>
    </div>
  );
};

const ChipsSell = () => {
  const Chip = ({ icon, title, text }) => (
    <div className="flex flex-col justify-center items-center m-4 max-w-[24rem]">
      <div className="flex flex-row justify-center">
        <Image
          src={chip}
          layout="fixed"
          width={86}
          height={86}
          alt="chip border"
          className={`${icon} max-w-[82px] max-h-[82px]`}
        />
      </div>
      <p className="text-white text-2xl font-vice">{title}</p>
      <p className="text-vwhite text-center">{text}</p>
    </div>
  );

  return (
    <div className="flex flex-col justify-center mt-8 min-w-full">
      <Subtitle>THE FUTURE</Subtitle>
      <div className="flex flex-row flex-wrap justify-center">
        <Chip
          icon="youown"
          title="You Own the Table"
          text="This is all yours. Stake and vote in Bulgaria's first decentralized casino DAO."
        />
        <Chip
          icon="youalwayswin"
          title="You Always Win"
          text="The odds are always in your favor. CryptoBet distributes profits back to token holders."
        />
        <Chip
          icon="oneclass"
          title="One Class of Token"
          text="Govern and play with the same token. Every bet you place represents stake in the DAO you collectively own."
        />
        <Chip
          icon="dice"
          title="Verifiably Random"
          text="Enjoy a fair game with multi-party randomness and non-exploitable results."
        />
      </div>
    </div>
  );
};

const Hero = () => {
  const isLarge = useIsLarge();

  return (
    <div className="flex flex-row min-w-full lg:min-w-[50%] justify-evenly mt-8 lg:mt-0">
      <div className="flex flex-col justify-top">
        {isLarge ? (
          <Image src={token_angle} alt="token logo" width={256} height={256} />
        ) : (
          <Image src={token_angle} alt="token logo" width={184} height={184} />
        )}
      </div>
      <div className="flex flex-col justify-evenly items-end min-h-[200px] ">
        <Link href="/profile">
          <a>
            <Button text="Buy Early" className="min-w-[10rem] text-lg" />
          </a>
        </Link>
        <Link href="/litepaper.pdf">
          <a target="_blank">
            <Button text="Litepaper" className="min-w-[11rem] text-lg" />
          </a>
        </Link>
        <Link href="https://t.me/+szz6qkGwgpExMzM0">
          <a>
            <Button text="Community" className="min-w-[12rem] text-lg" />
          </a>
        </Link>
      </div>
    </div>
  );
};

const Contact = ({ className }) => {
  const ContactForm = () => {
    const [status, setStatus] = React.useState(0);
    const [error, setError] = React.useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {
        email: event.target.email.value,
        question: event.target.question.value,
      };

      const JSONdata = JSON.stringify(data);
      const endpoint = "/api/contact";

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);

      if (response.status === 200) {
        setStatus(200);
      } else if (response.status === 400) {
        const result = await response.json();
        setStatus(400);
        setError(result.error);
      }
    };

    return (
      <Box className="flex flex-row justify-center my-2 max-w-[100%]">
        <form
          method="post"
          className="flex flex-col min-w-[84vw] lg:min-w-[50vw] px-[4vw]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="text-vwhite text-sans mt-2">
            Email:
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            className="rounded box-glow-vpurple bg-vbetgray text-vwhite p-2 mt-2"
          />
          <label htmlFor="question" className="text-vwhite text-mds mt-2">
            Question:
          </label>
          <textarea
            required
            id="question"
            name="question"
            rows="4"
            className="rounded box-glow-vpurple bg-vbetgray text-vwhite p-2 mt-2"
            maxLength="500"
          />
          {(() => {
            if (status === 200) {
              return (
                <div className="flex flex-row justify-center min-w-full p-1 mt-2 bg-vstolenpurple rounded">
                  <p className="min-w-full p-1 text-vwhite">
                    Thank you for getting in touch!
                  </p>
                </div>
              );
            } else if (status === 400) {
              return (
                <div className="flex flex-row justify-center min-w-full p-1 mt-2 bg-red-400 rounded">
                  <p className="min-w-full p-1 text-vwhite">{error}</p>
                </div>
              );
            }
          })()}
          <div className="flex flex-row justify-center">
            <button className="font-akira text-lg mt-6 mb-2 box-glow-vpurple px-4 py-2 text-vwhite bg-gradient-to-r from-vstolenpurple via-vstolenorange to-vstolenblue rounded p-[2px] background-gradient-animate drop-shadow-xl box-glow-vpurple">
              <div className="rounded w-full text-vblack py-[2.5%] font-akira tweaky-text">
                Send
              </div>
            </button>
          </div>
        </form>
      </Box>
    );
  };

  return (
    <div
      className={`flex flex-col justify-center min-w-full lg:min-w-[50%] lg:max-w-[50%] mt-8 ${className}`}
    >
      <Subtitle>Contact Us</Subtitle>
      <ContactForm />
      <div className="flex flex-row min-w-max justify-center">
        <Link href="https://t.me/+szz6qkGwgpExMzM0">
          <a className="ml-4 mt-1 mx-4">
            <Image
              src={telegram_logo}
              alt="telegram logo"
              height={32}
              width={32}
            />
          </a>
        </Link>
        <Link href="#">
          <a className="ml-4 mt-1  mx-4">
            <Image src={github_logo} alt="github logo" height={32} width={32} />
          </a>
        </Link>
        <Link href="#">
          <a className="ml-4 mt-1  mx-4">
            <Image src={email_logo} alt="email logo" height={32} width={32} />
          </a>
        </Link>
      </div>
    </div>
  );
};

const YourTokens = ({ tokens, referalCode }) => (
  <ShinyBox className="mt-8">
    <div className="flex flex-row flex-wrap min-w-full justify-around ">
      <div className="flex flex-col justify-center my-4">
        <span className="text-vstolenpurple font-bold text-2xl text-center text-shadow font-vice">
          Your Tokens: <span className="text-vwhite">{tokens}</span>
        </span>
        <span className="text-vwhite text-center">
          Access your wallet&nbsp;
          <Link href="#">
            <a className="underline text-vstolenpurple">here</a>
          </Link>
          .
        </span>
      </div>
      <div className="flex flex-col justify-center my-4">
        <span className="text-vstolenpurple text-2xl text-center text-shadow font-vice">
          Referal Code
        </span>
        <span
          className="rounded-xl bg-vblack active:bg-gray-700 text-vwhite text-center p-2"
          onClick={() => {
            navigator.clipboard.writeText(referalCode);
          }}
        >
          <span className="px-8">{referalCode}</span>
          <FontAwesomeIcon icon={faCopy} />
        </span>
        <span className="text-vwhite text-center text-sm pt-1">
          Send to your friends. Win&nbsp;
          <Link href="#">
            <a className="underline text-vstolenpurple">prizes</a>
          </Link>
          .
        </span>
      </div>
    </div>
  </ShinyBox>
);

const PreSaleCountdown = ({ start, end, className = "" }) => (
  <div className={"flex flex-col min-w-full lg:min-w-[50%] " + className}>
    <p className="pl-4 pb-2 font-semibold text-2xl text-vwhite font-akira lg:text-center">
      Pre - Sale
    </p>
    <Box>
      <div className="flex flex-col">
        <div className="flex flex-row min-w-full w-full">
          <div className="mt-4 rounded-md flex flex-row bg-slate-700 w-full m-2 max-h-6 drop-shadow">
            <div
              className="rounded-md h-5 bg-gradient-to-r from-vstolenpurple to-vstolenorange progress-shadow"
              style={{
                width: `${
                  ((new Date().getTime() - start.getTime()) /
                    (end.getTime() - start.getTime())) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <Timer finalDate={end} className="mt-4" />
    </Box>
  </div>
);

const PreSale = ({ sold, total, addr, className = "" }) => (
  <div className={"flex flex-col min-w-full " + className}>
    <p className="pl-4 pb-2 font-semibold text-2xl text-vwhite font-akira">
      Pre - Sale
    </p>
    <Box>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-col justify-center pl-2 drop-shadow">
            <Image src={token_logo} width={48} height={48} alt="Token Logo" />
          </div>
          <div className="px-2 flex flex-col justify-center">
            <p className="text-vwhite text-right text-shadow">
              {sold.toLocaleString()}
              &nbsp;/&nbsp;
              {sold < total ? (
                <span className="text-gray-400">{total.toLocaleString()}</span>
              ) : (
                <span className="text-vwhite">
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-row min-w-full w-full">
          <div className="rounded-md flex flex-row bg-slate-700 w-full m-2 max-h-6 drop-shadow">
            <div
              className="rounded-md h-5 bg-gradient-to-r from-vstolenpurple to-vstolenorange progress-shadow"
              style={{ width: `${(100 * sold) / total}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-row justify-center pb-2">
          <div className="flex flex-col mt-2">
            <Button text="Buy" className="w-24 text-2xl" />
          </div>
        </div>
        <p className="text-gray-400 text-xs">Contract Address: {addr}</p>
      </div>
    </Box>
  </div>
);

const Games = ({ className = "" }) => {
  const Game = ({ name, bg }) => (
    <div className="flex flex-row justify-center">
      <div className="drop-shadow p-4 my-2 ">
        <div
          className={
            bg +
            " rounded-xl flex flex-col justify-center min-h-[8rem] min-w-[10rem]"
          }
        >
          <div className="min-w-full font-bold text-center text-xl text-gray-300 drop-shadow">
            Coming Soon
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <p className="text-vwhite text-2xl">{name}</p>
        </div>
      </div>
    </div>
  );

  const isLarge = useIsLarge();

  return (
    <div className={" " + className}>
      <div className={"flex flex-col min-w-full"}>
        <Subtitle hr={!isLarge}>Games</Subtitle>
        <div className="flex flex-row flex-wrap justify-center">
          <Game name="Slots" bg="bg-slots" />
          <Game name="Roulette" bg="bg-roulette" />
          <Game name="Blackjack" bg="bg-blackjack" />
        </div>
      </div>
    </div>
  );
};

const Title = ({ className = "" }) => (
  <div className={`flex flex-col w-max ${className}`}>
    <p className="block text-4xl lg:text-[4rem] text-vstolenorange text-glow-vpurple font-vice font-bold text-center">
      CryptoBet
    </p>
    <p className="block text-xl text-vwhite font-vice text-shadow text-center lg:mt-3">
      Bulgaria&apos;s First Decentralized Casino
    </p>
    <div className="flex flex-row justify-center">
      <p className="block text-md text-vwhite font-sans text-shadow text-center">
        built on
      </p>
      <Image
        src={polygon_logo}
        height={18}
        className="inline"
        alt="polygon logo"
      />
    </div>
  </div>
);

const Sponsors = () => {
  const Sponsor = ({ src, alt, w, h, className = "" }) => (
    <div className={`flex flex-col justify-center mx-2 my-2 ${className}`}>
      <Image src={src} alt={alt} width={w} height={h} layout="fixed" />
    </div>
  );

  const isLarge = useIsLarge();

  return (
    <div className="flex flex-col justify-center min-w-full items-center lg:min-w-[50%]">
      <Subtitle hr={!isLarge}>PARTNERS</Subtitle>
      <div className="flex flex-row flex-wrap justify-center max-w-[80vw] lg:min-w-[50%]">
        <Sponsor src={polygon_logo} alt="polygon logo" w={130} h={32} />
        <Sponsor src="/launchhouse.webp" alt="launchhouse logo" w={82} h={82} />
        <Sponsor
          src={ybit_logo}
          alt="yale blockchain investment trust"
          w={84 * 0.956}
          h={84}
          className="bg-vwhite rounded-lg p-1"
        />
        <Sponsor
          src={nownodes_logo}
          alt="nownodes logo"
          w={32 * 4.841}
          h={32}
        />
      </div>
    </div>
  );
};

export default function Home({}) {
  const [data, setData] = React.useState(null);

  const isLarge = useIsLarge();

  useSWR(
    "/api/presale",
    (...args) =>
      fetch(...args)
        .then((res) => res.json())
        .then((d) => setData(d)),
    { refreshInterval: 1000 }
  );

  if (!data) {
    return (
      <div className="min-w-screen min-h-screen bg-nogif flex flex-col justify-center items-center">
        <Image src={token_angle} alt="Token Logo" />
        <p className="text-4xl text-vwhite font-akira">LOADING . . . </p>
      </div>
    );
  }

  let { startCounterTime, endCounterTime } = data;
  startCounterTime = new Date(startCounterTime);
  endCounterTime = new Date(endCounterTime);

  return (
    <div className="min-h-screen flex flex-col justify-top items-center bg-nogif max-w-full">
      {/* <YourTokens tokens={tokens} referalCode={referalCode} /> */}
      {isLarge ? <Navbar /> : <Hamburger />}
      <Title className="mt-[5rem]" />
      {isLarge ? (
        <div className="flex flex-row justify-evenly min-w-[80%] mt-8 items-center max-w-[80%]">
          <PreSaleCountdown start={startCounterTime} end={endCounterTime} />
          <Hero />
        </div>
      ) : (
        <>
          <Hero />
          <PreSaleCountdown start={startCounterTime} end={endCounterTime} />
        </>
      )}
      <ChipsSell />
      {isLarge ? (
        <>
          <div className="flex flex-row justify-evenly min-w-[80%] mt-8 items-center max-w-[80%]">
            <WhatYouGet />
            <div className="flex flex-col justify-start min-w-[50%]">
              <Sponsors />
              <Games className="mt-12 min-w-full" />
            </div>
          </div>
        </>
      ) : (
        <>
          <WhatYouGet />
          <Sponsors />
        </>
      )}

      <Contact className="mb-2" />
      <Footer />
    </div>
  );
}
