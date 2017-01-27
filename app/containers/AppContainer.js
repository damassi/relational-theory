import React, { Component } from 'react'
import * as Relay from "react-relay"

export class AppContainer extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        hi!
      </div>
    )
  }
}

export default Relay.createContainer(AppContainer, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        name
        counts {
          artworks,
          partner_shows
          articles
        }
      }
    `,
  },
})
