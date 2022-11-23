import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "react-native-rapi-ui";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/provider/AuthProvider";
import FlashMessage from "react-native-flash-message";


export default function App() {
  const images = [
    require("./assets/images/login0.jpg"),
    // require("./assets/images/register.png"),
    // require("./assets/images/forget.png"),
  ];
  return (
    <ThemeProvider images={images}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <StatusBar />
      <FlashMessage position="top" />

    </ThemeProvider>
  );
}
