import { HR } from "./HR";

export const Subtitle = ({ children, hr = true }) => (
  <div className="min-w-full flex flex-col justify-center">
    <p className="ml-4 font-semibold text-3xl text-vwhite text-center font-akira">
      {children}
    </p>
    {hr ? <HR /> : <></>}
  </div>
);
