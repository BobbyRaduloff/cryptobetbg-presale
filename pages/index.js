import Link from "next/link";
import React, { Children } from "react";

const Box = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="text-vwhite flex flex-col justify-center px-12 mb-8 min-w-full">
      <p className="text-center box-shadow-vpurple bg-vpink">
        {childrenArray[0]}
      </p>
      {Children.map(childrenArray, (child, index) => {
        if (index != 0) {
          return <p className="text-center mt-2">{child}</p>;
        }
      })}
    </div>
  );
};

const PreSale = ({ sold, total, timeLeft }) => (
  <div className="flex flex-col min-w-full box-shadow-vpurple bg-vblue pt-1">
    <div className="flex flex-row flex-wrap justify-between">
      <p className="text-vwhite px-2"> Tokens Sold: {sold}</p>
      <p className="text-vwhite px-2"> {timeLeft} left </p>
    </div>
    <div className="flex flex-row w-9/10 bg-gray-700 m-2 max-h-6">
      <div
        className="h-6 bg-vyellow"
        style={{ width: `${(100 * sold) / total}%` }}
      ></div>
      <div className="h-6 bg-vwhite" style={{ width: "2px" }}></div>
    </div>
  </div>
);

export default function Home() {
  const [name, setName] = React.useState("Boris");
  const [tokens, setTokens] = React.useState(10000);
  const [percentage, setPercentage] = React.useState(0.0001);
  const [referalCode, setReferalCode] = React.useState(
    "https://cryptobet.bg/r/abcdef"
  );
  const [sold, setSold] = React.useState(234453);
  const [total, setTotal] = React.useState(1000000);
  const [timeLeft, setTimeLeft] = React.useState("16 days");

  return (
    <div className="min-h-screen w-screen flex flex-col justify-top items-center bg-gif">
      <div className="min-w-full justify-end flex flex-row bg-gradient-to-t py-4">
        <Link href="#">
          <a className="mr-4 text-vwhite italic font-sans upercase underline">
            PROFILE
          </a>
        </Link>
        <Link href="#">
          <a className="mr-4 text-vwhite italic font-sans upercase underline">
            ABOUT
          </a>
        </Link>
      </div>
      <div className="flex flex-row w-max mt-10 ">
        <p className="block text-2xl md:text-3xl lg:text-4xl text-vyellow font-outrun text-glow-vpink">
          Welcome,&nbsp;&nbsp;&nbsp;{name}!
        </p>
      </div>
      <div className="flex flex-row flex-wrap min-w-full justify-around mt-16">
        <Box>
          <>Your Tokens: {tokens}</>
          <>
            Access your wallet&nbsp;
            <Link href="#">
              <a className="underline text-vpink">here</a>
            </Link>
            .
          </>
        </Box>
        <Box>
          <>Referal Code: {referalCode}</>
          <>
            Send to your friends. Win&nbsp;
            <Link href="#">
              <a className="underline text-vpink">prizes</a>
            </Link>
            .
          </>
        </Box>
      </div>
      <div className="flex flex-row px-12 min-w-full">
        <PreSale sold={sold} total={total} timeLeft={timeLeft} />
      </div>
    </div>
  );
}
