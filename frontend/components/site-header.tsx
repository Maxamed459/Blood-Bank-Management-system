import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./ui/mode-toggle";
import { useAppSelector } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function SiteHeader() {
  const {user} = useAppSelector((state) => state.auth);
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-[9px] md:text-[16px] font-medium">Hi <span className="font-bold text-red-600">{user?.role.toLowerCase()}, {user?.fullname.toLowerCase()}</span> Welcome to the Blood Bank Management System</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-600 border p-1">
            {user?.gender === "MALE" ? (
              <>
              <img src="/man_avater.svg" className="aspect-square w-full" alt="man avater" />
              </>
            ) : (
              <>
              <img src="/woman_avater.svg" className="aspect-square w-full" alt="woman avater" />
              </>
            )}
            
          </div>
          <div className="hidden md:block">
              <p className="text-xs">{user?.fullname}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
