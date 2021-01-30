import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./App/pages/Home";
import Build from "./App/pages/Build";
import Test from "./App/pages/Test";
import Upload from "./App/pages/Upload";
import UploadNew from "./App/pages/UploadNew";
import UploadEdit from "./App/pages/UploadEdit";
import UploadDelete from "./App/pages/UploadDelete";
import Download from "./App/pages/Download";
import Navagation from "./App/components/Navagation";

class App extends Component {
    render() {
        const App = () => (
            <div>
                <Navagation></Navagation>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/build" component={Build} />
                    <Route path="/test" component={Test} />
                    <Route path="/upload" component={Upload} />
                    <Route path="/download" component={Download} />
                    <Route path="/upload-new" component={UploadNew} />
                    <Route path="/upload-edit" component={UploadEdit} />
                    <Route path="/upload-delete" component={UploadDelete} />
                </Switch>
            </div>
        );
        return (
            <Switch>
                <App />
            </Switch>
        );
    }
}

export default App;
