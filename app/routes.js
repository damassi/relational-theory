import * as express from "express"
import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import * as Relay from "react-relay"

import IsomorphicRelay from "isomorphic-relay"

import { artsyRelayMiddleware } from "./relay/config"
import { ArtistQueryConfig } from "./relay/root_queries"

const app = express.Router()

app.use(artsyRelayMiddleware)

app.get("/", (req, res, next) => {
  res.send(`<html><body><ul>
    <li>does this work!</div>
  </ul></body></html>`)
})

export default app
