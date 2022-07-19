import React from "react";

export const LG_BREAKPOINT = 1024;

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState({});

  React.useEffect(() => {
    const handler = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handler);
    handler();

    return () => window.removeEventListener("resize", handler);
  }, []);

  return windowDimensions;
};

export const useIsLarge = () => {
  const windowDimensions = useWindowDimensions();
  return windowDimensions.width >= LG_BREAKPOINT;
};
