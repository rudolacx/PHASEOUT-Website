import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {

title:"PHASEOUT ESPORTS",

description:"POT Apex Legends Esports Team"

};



export default function RootLayout({

children,

}: Readonly<{

children: React.ReactNode;

}>) {


return (

<html lang="ko">

<body>

{children}

</body>

</html>

);

}