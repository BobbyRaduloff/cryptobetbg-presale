export const Button = ({ text, className = "", onClick = () => {} }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-vstolenpurple via-vstolenorange to-vstolenblue rounded p-[2px] background-gradient-animate ${className} drop-shadow-xl box-glow-vpurple`}
  >
    <div className="rounded w-full text-vblack py-[2.5%] font-akira tweaky-text">
      {text}
    </div>
  </button>
);
