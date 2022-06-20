import LinkAsButton from "./LinkAsButton";
import WarningIcon from "./SVG/WarningIcon";

const NotFound = () => {
  return (
    <div className="flex max-w-full flex-col items-center justify-center">
      <WarningIcon height={130} />
      <h1 className="mb-4 text-center text-6xl">404</h1>
      <p className="w-full break-words text-center text-2xl">
        That page could not be found
      </p>
      <div className="m-auto mt-4 w-[200px] max-w-full bg-red-400">
        <LinkAsButton href="/">Back to home</LinkAsButton>
      </div>
    </div>
  );
};
export default NotFound;
