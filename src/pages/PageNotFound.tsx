import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/lib/constants";

const PageNotFound = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="text-3xl font-bold">PageNotFound</p>
        <Button
          onClick={() => (document.location.href = CONSTANTS.ROUTES.MAIN)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
