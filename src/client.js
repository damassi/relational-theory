import AppContainer from "containers/app_container"
import IsomorphicRelay from "isomorphic-relay"
import React from "react"
import ReactDOM from "react-dom"
import { ArtistQueryConfig } from "relay/root_queries"
import { artsyRelayEnvironment } from "relay/config"

const rootElement = document.getElementById("root")

const environment = artsyRelayEnvironment()
IsomorphicRelay.injectPreparedData(environment, window.ARTIST_PROPS)

IsomorphicRelay.prepareInitialRender({
  Container: AppContainer,
  queryConfig: new ArtistQueryConfig({ artistID: window.ARTIST_ID }),
  environment,
}).then((props) => {
  ReactDOM.render(<IsomorphicRelay.Renderer {...props} />, rootElement)
})

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }
}
