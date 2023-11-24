import React from "react";
import Navigators from "./src/navigators";
import { Provider } from "react-redux";
import store from "./src/store/store";
import Toast from "react-native-toast-message";
  
  const App = () => {
    return (
      <Provider store={store}>
        <Navigators />
        <Toast
          autoHide={true}
          visibilityTime={2500}
        />
      </Provider>
    );
  };
  
  export default App;
