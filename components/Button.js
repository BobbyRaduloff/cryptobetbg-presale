export const Button = ({ text, className = "", onClick = () => {} }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-vstolenpurple via-vstolenorange to-vstolenblue rounded background-gradient-animate ${className} drop-shadow-xl box-glow-vpurple p-[5%]`}
  >
    <div className="rounded w-full text-vblack font-akira tweaky-text text-center min-w-full">
      {text}
    </div>
  </button>
);
