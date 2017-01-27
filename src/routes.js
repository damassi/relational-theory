import AppContainer from "containers/app_container"
import IsomorphicRelay from "isomorphic-relay"
import React from "react"
import ReactDOMServer from "react-dom/server"
import express from "express"
import { ArtistQueryConfig } from "relay/root_queries"
import { artsyRelayMiddleware } from "relay/config"

const app = express.Router()

app.use(artsyRelayMiddleware)

app.get("/", (req, res) => {
  res.send(`<html><body><ul>
    <li>does this work!</div>
  </ul></body></html>`)
})

app.get("/artist/:id", async (req, res, next) => {
  try {
    const { data, props } = await IsomorphicRelay.prepareData({
      Container: AppContainer,
      queryConfig: new ArtistQueryConfig({ artistID: req.params.id }),
    }, res.locals.networkLayer)

    const content = ReactDOMServer.renderToString(
      <IsomorphicRelay.Renderer {...props} />
    )

    res.send(`
      <html>
      <head>
        <script type="text/javascript" src="/assets/commons.chunk.js" defer></script>
        <script type="text/javascript" src="/assets/app.js" defer></script>
        <script type="text/javascript">
        var ARTIST_ID = "${req.params.id}"; var ARTIST_PROPS = ${JSON.stringify(data)}
        </script>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
      </html>
    `)
  } catch (error) {
    return next(error)
  }
})

export default app
