export default function CheckIcon({ fill = "black" }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="M9.525 17.657l-4.95-4.95 1.414-1.414 3.537 3.534-.001.001 8.485-8.485 1.414 1.414-8.485 8.486-1.413 1.413-.001.001z"
      ></path>
    </svg>
  );
}
