import { useState } from "react";
import Image from "next/image";

function RotationButton({ image }) {
  const pauseSVG = (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="pauseCircleIconTitle"
      stroke="#2329D6"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#2329D6"
    >
      {" "}
      <title id="pauseCircleIconTitle">Pause</title>{" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      />{" "}
      <path fillRule="evenodd" clipRule="evenodd" d="M8 8V16H10V8H8Z" />{" "}
      <path fillRule="evenodd" clipRule="evenodd" d="M14 8V16H16V8H14Z" />{" "}
    </svg>
  );

  const playSVG = (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="48px"
      height="48px"
      viewBox="0 0 24 24"
      aria-labelledby="videoIconTitle"
      stroke="#2329D6"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      color="#2329D6"
    >
      {" "}
      <title id="videoIconTitle">Video</title>{" "}
      <polygon points="18 12 9 16.9 9 7" /> <circle cx="12" cy="12" r="10" />{" "}
    </svg>
  );

  const [isPause, setIsPause] = useState(true);
  function pausingFunction() {
    setIsPause(!isPause);
  }

  return (
    <>
      <Image
        src={image}
        width={180}
        height={180}
        alt="product image"
        className={isPause ? "image" : ""}
      />
      <div onClick={pausingFunction} style={{ marginTop: "15px" }}>
        {isPause ? pauseSVG : playSVG}
      </div>
    </>
  );
}

export default RotationButton;
