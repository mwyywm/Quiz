const LoadingSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      className="m-auto animate-spin"
      viewBox="0 0 46 46"
    >
      <g className="fill-amber-500">
        <path
          d="M23 0a23 23 0 100 46 23 23 0 000-46zm0 5.75a17.25 17.25 0 110 34.5 17.25 17.25 0 010-34.5z"
          opacity="0.6"
        ></path>
        <path d="M23 0a23 23 0 0123 23h-5.75A17.25 17.25 0 0023 5.75V0z"></path>
      </g>
      <defs>
        <clipPath id="clip0_104_2">
          <path fill="#fff" d="M0 0H46V46H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default LoadingSpinner;
