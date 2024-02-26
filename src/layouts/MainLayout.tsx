import { Toaster } from "@/components/ui/toaster";

interface Props {
  className?: string;
  children?: any;
}

const MainLayout = ({ className, children }: Props) => {
  return (
    <div className={`h-screen ${className || ""}`}>
      {children}
      <Toaster />
    </div>
  );
};

export default MainLayout;
