import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const List = ({ children, className = "", colored = true }) => {
  const Dot = ({ color }) => (
    <div className="flex flex-col justify-center mt-2">
      <FontAwesomeIcon
        icon={faDiamond}
        color={colored ? color : "#F5F0F6"}
        className="mr-2"
      />
    </div>
  );

  const colors = ["#a162de", "#A759A6", "#CB706C", "#DA8876", "#EE9554"];

  return (
    <div className="flex flex-col justify-left pl-4">
      {React.Children.map(children, (c, index) => (
        <div className="flex flex-row justify-start items-start my-1">
          <Dot color={colors[index]} />
          <div className="flex flex-col">{c}</div>
        </div>
      ))}
    </div>
  );
};
