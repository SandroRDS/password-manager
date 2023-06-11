import { useState, useEffect } from "react";
import { getThemeSaved } from "./utils/themeStorageUtils";
import switchTheme from "./utils/switchTheme";

import './styles/_base.scss';

import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Header from "./components/Header/Header";


function AppMobile() {
  const [isLoading, setIsLoading] = useState(true);
  const pageTheme = getThemeSaved();
  switchTheme(pageTheme);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  return (
    isLoading ? (
      <LoadingScreen />  
    ) : (
      <>
        <Header />
      </>
    )
  );
}

export default AppMobile;
