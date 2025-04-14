import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App/Global/app-sidebar";
import Header from "@/components/App/Global/header";
import { getUserData } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const user = await getUserData();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col  items-center justify-center h-screen redd p-1">
        <Header>
          <SidebarTrigger />
        </Header>
        <div id="view" className="size-full p-1">
          <div className="bg-neutral-100 z-40 rounded-md size-full  ">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
