export default function WarningIcon({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
      width={width}
      height={height}
    >
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      >
        <path
          fill="#ffad21"
          d="M32.522 13.005c.698-1.205 1.986-2.024 3.478-2.024 1.492 0 2.78.82 3.478 2.024L60.446 54.94c.343.594.554 1.274.554 2.008a4.032 4.032 0 01-4.032 4.033l-41.936.017A4.033 4.033 0 0111 56.966c0-.736.211-1.415.554-2.009l20.968-41.952"
        ></path>
        <path
          fill="#FFF"
          d="M37.613 47.27a1.613 1.613 0 01-3.226 0V23.893a1.613 1.613 0 013.226 0v23.379z"
        ></path>
        <circle cx="36" cy="54.529" r="1.613" fill="#FFF"></circle>
      </g>
      <g
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      >
        <path d="M32.522 13.005c.698-1.205 1.986-2.024 3.478-2.024 1.492 0 2.78.82 3.478 2.024L60.446 54.94c.343.594.554 1.274.554 2.008a4.032 4.032 0 01-4.032 4.033l-41.936.017A4.033 4.033 0 0111 56.966c0-.736.211-1.415.554-2.009l20.968-41.952"></path>
        <path d="M37.613 47.27a1.613 1.613 0 01-3.226 0V23.893a1.613 1.613 0 013.226 0v23.379z"></path>
        <circle cx="36" cy="54.529" r="1.613"></circle>
      </g>
    </svg>
  );
}
