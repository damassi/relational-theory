import IsomorphicRelay from "isomorphic-relay"
import * as React from "react"
import * as ReactDOM from "react-dom"

import { artsyRelayEnvironment } from "../relay/config"
import { ArtistQueryConfig } from "../relay/root_queries"

import AppContainer from "../containers/AppContainer"

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
