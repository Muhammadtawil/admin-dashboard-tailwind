"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { Fab } from "@mui/material";
import { IoIosChatbubbles } from "react-icons/io";
import FloatingChat from "@/components/Dashboard/chat/chat_component";
import Chatbox from "@/components/Dashboard/chat/chat_component";
import { useLocale } from "next-intl";
// Import statements

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const router = usePathname();
  const isLoginPage = router.includes("/login");
  const [rtl, setRtl] = useState(false);
  const  handleRtl=() =>{
    setRtl((prevShowForm) => !prevShowForm);
  }

  const locale=useLocale()
  return (
    <html lang="en">
      <body>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : isLoginPage ? (
              <div className="bg-boxdark h-screen ">
             
                {children}
                
              
              </div>
          ) : (
            <div className="flex h-screen overflow-hidden" dir={locale=="ar"?'':""}>
              {/* <!-- ===== Sidebar Start ===== --> */}
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} HandleRTL={handleRtl} />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}

                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
                  {/* <!-- ===== Content Area End ===== --> */}
                     {/* <!-- ===== FAB Button Start ===== --> */}
                <div className="fixed bottom-4 right-5 text-2xl ">
                  {/* <Fab color="success" aria-label="edit" className="bg-form-input dark:bg-body text-2xl">
                    <IoIosChatbubbles   className=" text-2xl"/>
                  </Fab> */}
          
                  
                  </div>
      <Chatbox/>
                  
            </div>
          )}

        </div>

      </body>
    </html>
  );
}
