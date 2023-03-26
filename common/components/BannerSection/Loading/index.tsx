const LoadingBanner = () => {
  const descriptionLinesCount = 3;
  return (
    <section className="relative -mx-3 aspect-[0.667] max-h-[85vh] overflow-hidden md:-mx-4 md:aspect-[1.778] lg:-mx-6 2xl:-mx-8">
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 bottom-1/3 z-10 w-[42rem] max-w-full px-8">
          <div
            className="
            mb-5 h-7 w-3/5 animate-pulse bg-stone-900 font-bold 
            drop-shadow-[0_25px_25px_rgb(0,0,0)] md:h-9 
            md:drop-shadow-none lg:h-12 xl:h-14
            "
          />
          <span className="sr-only">loading...</span>
          <div className="flex flex-col gap-3">
            {Array(descriptionLinesCount)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  className="
                    drop-shadow-[0_25px_25px_rgb(0 0,0)] h-4 w-full animate-pulse
                    bg-stone-900 text-stone-50 md:h-5 md:drop-shadow-none
                  "
                />
              ))}
          </div>
        </div>

        <span className="lr-overlay absolute inset-0 max-w-3xl"></span>
        <span className="bt-overlay-lg absolute bottom-0 left-0 right-0 h-[14.7vw]"></span>
      </div>
    </section>
  );
};

export default LoadingBanner;
