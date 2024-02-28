import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ITooltipProps } from "@/lib/interface";

const CustomTooltip = ({ children, content }: ITooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="break-all max-w-[300px]">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
