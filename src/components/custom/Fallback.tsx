import Loading from "../icons/Loading";

const Fallback = () => {
  return (
    <div
      id="loader-container"
      className="w-full flex justify-center items-center h-screen"
    >
      <Loading id="loader" className="w-[200px]" />
    </div>
  );
};

export default Fallback;
