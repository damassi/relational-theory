import React, { Component } from 'react'
import Relay from 'react-relay'
import './app_container.styl'

export class AppContainer extends Component {
  render () {
    console.log(this.props) // eslint-disable-line
    return (
      <div>
        hey!
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
    `
  }
})
