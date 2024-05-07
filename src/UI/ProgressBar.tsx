import { useEffect, useState } from "react";

type Props = {};
const ProgressBar = ({}: Props) => {
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (filled < 100 && isRunning) {
      interval = setInterval(() => {
        setFilled((prev) => (prev += 2));
      }, 50);
    } else {
      setIsRunning(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [filled, isRunning]);

  return (
    <div>
      <div className=" h-3 bg-gray-200 overflow-hidden">
        <div
          className={`h-full bg-green-500 rounded-full`}
          style={{ width: `${filled}%`, transition: "width 0.5s" }}
        ></div>
      </div>
      <button
        className="mt-4 px-4 mb-2  py-2 gap-2 text-base font-bold bg-black text-white rounded-lg"
        onClick={() => setIsRunning(true)}
      >
        {isRunning ? "Running..." : "Start"}
      </button>
    </div>
  );
};

export default ProgressBar;
