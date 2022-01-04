import 'wdyr'
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools } from 'jira-dev-tool'
import 'antd/dist/antd.less'
import { AppProviders } from "context/index";
import {ErrorBoundary} from 'components/error-boundary'
import {FullPageError} from 'components/lib'

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools/>
        <ErrorBoundary fallbackRender={FullPageError}>
        <App />
        </ErrorBoundary>
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
