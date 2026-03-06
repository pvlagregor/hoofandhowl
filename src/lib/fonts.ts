import { DM_Serif_Display, Raleway } from "next/font/google";

export const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-raleway",
  display: "swap",
});
