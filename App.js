import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";


import Routes from "./src/routes/routes";

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar backgroundColor="#FFF" style="auto" />
    </>
  );
}
