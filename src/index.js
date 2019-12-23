import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import PageTransition from '@steveeeie/react-page-transition';
import App from "./containers/Index/index";
import Impress from "./containers/ImpressPrivacy/impressprivacy";
import Monitor from "./containers/Monitor/monitor";
import NotFound from "./containers/NotFound/notfound";
import Stop from "./containers/Monitor/stop/stop";
import Settings from "./containers/Settings/settings";
import Welcome from "./containers/Onboarding/welcome";

var previousPathname = "";

const routing = (
    <BrowserRouter>
        <Route
            render={({ location }) => {
                var transition = "fadeRightFadeLeft";
                if (location.pathname.length > previousPathname.length) {
                    transition = "fadeLeftFadeRight";
                }
                previousPathname = location.pathname;
                return (
                    <PageTransition
                        preset={transition}
                        transitionKey={location.pathname}>
                        <Switch location={location}>
                            <Route exact path="/" component={App} />
                            <Route exact path="/onboarding/welcome" component={Welcome} />
                            <Route exact path="/settings" component={Settings} />
                            <Route exact path="/impressprivacy" component={Impress} />
                            <Route exact path="/monitor" component={Monitor} />
                            <Route path="/monitor/:network/stop/:id" component={Stop} />
                            <Route component={NotFound} />
                        </Switch>
                    </PageTransition>
                )
            }}
        />
    </BrowserRouter>

);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
