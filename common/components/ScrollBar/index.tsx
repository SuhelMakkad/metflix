export type Props = {
  scrolledPercentage: number;
};

const ScrollBar = ({ scrolledPercentage }: Props) => {
  return (
    <div className="relative h-2 bg-white/20">
      <span
        className="
          absolute inset-0 transition-transform
          after:absolute after:inset-0 after:w-1/3 after:-translate-x-full after:rounded
          after:bg-white/40
        "
        style={{ transform: `translateX(${scrolledPercentage}%)` }}
      ></span>
    </div>
  );
};

export default ScrollBar;
