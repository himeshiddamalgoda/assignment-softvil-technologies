import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/components/theme/theme";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "@/components/layout/navbar";
import StoreInitializer from "@/components/store-initializer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventhub",
  description: "Manage your Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <StoreInitializer />{/* for using zustand state management*/}
              {/* <UserProvider>
              <EventProvider> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1 }}>
                  {children}
                </Box>
                <Footer/>
              </Box>
              {/* </EventProvider>
            </UserProvider> */}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
