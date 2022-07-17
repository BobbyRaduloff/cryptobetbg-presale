import React from "react";
import dynamic from "next/dynamic";
import { Box } from "./Boxes";

export const TimerSSR = ({ finalDate, className = "" }) => {
  const [now, setNow] = React.useState(new Date(Date.now()));
  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date(Date.now())), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  let totalSeconds = (finalDate.getTime() - now.getTime()) / 1000;

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  totalSeconds = totalSeconds - days * 24 * 60 * 60;
  const hours = Math.floor(totalSeconds / (60 * 60));
  totalSeconds = totalSeconds - hours * 60 * 60;
  const minutes = Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds - minutes * 60;
  const seconds = Math.floor(totalSeconds);

  const Hand = ({ value, name }) => (
    <div className="flex flex-col justify-center mx-1 w-16 text-shadow">
      <p className="text-3xl text-center">{value}</p>
      <p className="text-md text-center">{name}</p>
    </div>
  );

  const Colon = () => (
    <p className="text-2xl text-center mx-1 text-shadow">|</p>
  );

  return (
    <Box className={"text-vwhite " + className}>
      <div className="flex flex-row justify-center">
        <Hand value={days} name="days" />
        <Colon />
        <Hand value={hours} name="hours" />
        <Colon />
        <Hand value={minutes} name="minutes" />
        <Colon />
        <Hand value={seconds} name="seconds" />
      </div>
    </Box>
  );
};

export const Timer = dynamic(() => Promise.resolve(TimerSSR), { ssr: false });
