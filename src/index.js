import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import Router from "./router";
import { store, persistor } from "./redux/Store";
import Toast from "react-native-toast-message";

const Init = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
          <Toast position="bottom" bottomOffset={20} />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};

export default Init;
