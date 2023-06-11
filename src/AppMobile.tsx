import { useState, useEffect } from "react";
import { getThemeSaved } from "./utils/themeStorageUtils";
import switchTheme from "./utils/switchTheme";

import './styles/_base.scss';

import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Header from "./components/Header/Header";


function AppMobile() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFinish, setLoadingFinish] = useState(false);
  const pageTheme = getThemeSaved();
  switchTheme(pageTheme);

  useEffect(() => {
    setLoadingFinish(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    isLoading ? (
      <LoadingScreen {...{loadingFinish}} />  
    ) : (
      <>
        <Header />
      </>
    )
  );
}

export default AppMobile;
