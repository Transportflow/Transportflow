import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import "./index.css";
import "./css/tailwind.css";
import * as serviceWorker from "./serviceWorker";
import PageTransition from '@steveeeie/react-page-transition';
import App from "./containers/Index/index";
import Impress from "./containers/ImpressPrivacy/impressprivacy";
import Monitor from "./containers/Monitor/search/monitor";
import NotFound from "./containers/NotFound/notfound";
import Stop from "./containers/Monitor/stop/stop";
import Settings from "./containers/Settings/settings";
import Welcome from "./containers/Onboarding/welcome";
import Theme from "./containers/Onboarding/theme";
import Network from "./containers/Onboarding/network";
import Done from "./containers/Onboarding/done";

import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers";

const store = createStore(reducer);
var previousPathname = "";

const routing = (
    <Provider store={store}>
        <BrowserRouter>
            <Route
                render={({location}) => {
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
                                <Route exact path="/" component={App}/>

                                <Route exact path="/onboarding/welcome" component={Welcome}/>
                                <Route exact path="/onboarding/theme" component={Theme}/>
                                <Route exact path="/onboarding/network" component={Network}/>
                                <Route exact path="/onboarding/done" component={Done}/>

                                <Route exact path="/settings" component={Settings}/>
                                <Route exact path="/impressprivacy" component={Impress}/>
                                <Route exact path="/monitor" component={Monitor}/>
                                <Route path="/monitor/:network/stop/:id" component={Stop}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </PageTransition>
                    )
                }}
            />
        </BrowserRouter>
    </Provider>

);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
