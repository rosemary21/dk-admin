"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import "antd/dist/antd.css";
import "@mantine/core/styles.css";
import { useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import Cookies from "js-cookie";
import clearCookies from "@/utils/clearCookies";
import { useRouter } from "next/navigation";
import { LINKS, adminUser, getUserName } from "@/utils/Links";
import openNotification from "@/utils/openNotification";
import { MantineProvider, Loader } from "@mantine/core";
import Loading from "@/utils/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "@/contexts";

const poppins = Poppins({
  style: ["normal"],
  weight: "400",
  subsets: ["devanagari"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });
  const router = useRouter();
  const onIdle = () => {
    timeOut();
  };

  useIdleTimer({
    onIdle,
    timeout: 1000 * 60 * 10,
    promptTimeout: 0,
    events: [
      "mousemove",
      "keydown",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
    ],
    immediateEvents: [],
    debounce: 0,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    syncTimers: 0,
  });

  const timeOut = () => {
    localStorage.clear();
    clearCookies();
    router.push(LINKS.dashboardLogin);
    timeOutNotification();
  };

  const timeOutNotification = () => {
    openNotification(
      "Session Timeout",
      `This user has been inactive for more than 10 minutes, please Login to continue`
    );
  };

  useEffect(() => {
    const admin = getUserName();
    if (admin) {
      Cookies.set(adminUser, admin);
    } else {
      router.push(LINKS.dashboardLogin);
    }

    window.scrollTo(0, 0);
  }, []);
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        <title>DK Admin</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@100;200;300;400;500;600&family=DM+Sans:wght@400;500;700&family=Inter:wght@100;300;400;500;600;700&family=Manrope:wght@200;300;400;500;600;700&family=Montserrat:wght@100;200;300;600;700&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            theme={{
              components: {
                Loader: Loader.extend({
                  defaultProps: {
                    loaders: { ...Loader.defaultLoaders, custom: Loading },
                    type: "custom",
                  },
                }),
              },
            }}
          >
            <ContextProvider>{children}</ContextProvider>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
