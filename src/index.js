import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./index.css";
import "./css/tailwind.css";
import * as serviceWorker from "./serviceWorker";
import { PageTransition } from "@steveeeie/react-page-transition";
import App from "./containers/Index/index";
import Impress from "./containers/ImpressPrivacy/impressprivacy";
import NotFound from "./containers/NotFound/notfound";
import Welcome from "./containers/Onboarding/welcome";
import Theme from "./containers/Onboarding/theme";
import Privacy from "./containers/Onboarding/privacy";
import Done from "./containers/Onboarding/done";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import Ackee from "./components/Ackee";

const store = createStore(reducer);
let previousPathname = "";
const routing = (
  <Provider store={store}>
    <BrowserRouter>
      <Ackee />
      <div className="bg-gray-300 dark\:bg-gray-800 transition-bg duration-200 min-h-screen">
        <Route
          render={({ location }) => {
            let preset = "moveToRightFromLeft";
            let exit = "moveToRight";
            if (location.pathname.length > previousPathname.length) {
              preset = "moveToLeftFromRight";
              exit = "moveToLeft";
            }
            previousPathname = location.pathname;

            return (
              <PageTransition
                preset={preset}
                transitionKey={location.pathname}
                exitAnimation={exit}
              >
                <Switch location={location}>
                  <Route exact path="/" component={App} />

                  <Route exact path="/onboarding/welcome" component={Welcome} />
                  <Route exact path="/onboarding/theme" component={Theme} />
                  <Route exact path="/onboarding/privacy" component={Privacy} />
                  <Route exact path="/onboarding/done" component={Done} />

                  <Route exact path="/impressprivacy" component={Impress} />
                  <Route component={NotFound} />
                </Switch>
              </PageTransition>
            );
          }}
        />
      </div>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
