import React, { FC, useEffect } from "react";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import { useActions } from "./hooks/useActions";
import "./App.css";
import { getCookie } from "./utils/cookies";

const App: FC = () => {
  const { getCurrentUser, setIsAuth } = useActions();

  useEffect(() => {
    if (getCookie("token")) {
      getCurrentUser();
      setIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout>
        <Navbar />
        <Layout.Content>
          <AppRouter />
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default App;
