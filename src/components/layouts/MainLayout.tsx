import Sidebar from "../../components/Sidebar";
import BottomNav from "../../components/BottomNav";
import Navbar from "../../components/Navbar";
import CtaLoginCard from "../../components/CtaLoginCard";
import { useLocation } from "react-router";
import type { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const titles: { [key: string]: string } = {
    "/": "For you",
    "/profile": "Profile",
  };
  const title = titles[location.pathname] || "wepost";
  return (
    <>
      <div className="flex justify-center gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-72">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="w-full max-w-3xl">
          <Navbar title={title} />
          <main className="pb-24">{children}</main>
        </div>

        {/* Right CTA */}
        <div className="hidden xl:block w-80">
          <div className="fixed top-6 w-80">
            <CtaLoginCard />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </>
  );
};
export default MainLayout;
