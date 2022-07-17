export const ShinyBox = ({ children, className = "" }) => (
  <div className={"px-2" + className}>
    <div
      className={
        "bg-gradient-to-br from-vstolenpurple to-vgray p-0.5 rounded-xl"
      }
    >
      <div className="min-w-full bg-gradient-to-br from-slate-700 to-vgray rounded-xl p-[1rem]">
        {children}
      </div>
    </div>
  </div>
);

export const Box = ({ children, className = "" }) => (
  <div className={"min-w-full drop-shadow px-2 " + className}>
    <div className="bg-vgray rounded-xl p-2 min-w-fit">{children}</div>
  </div>
);
