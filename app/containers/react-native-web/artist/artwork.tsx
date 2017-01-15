import * as Relay from 'react-relay'
import * as React from 'react'
import { Image, TextStyle, View, ViewStyle, StyleSheet, TouchableWithoutFeedback } from "react-native-web"
import { map } from 'lodash'

// import ImageView from '../opaque_image_view'
const ImageView = (props: { style: ViewStyle, aspectRatio: number, imageURL: string }) => <img src={props.imageURL} style={{ width: "100%" }} />

import SerifText from './text/serif'
const colors = require("../../../../data/colors.json")
import GQL from "../../../gql"

import SwitchBoard from './switch_board'

interface Props {
  artwork: GQL.ArtworkType,
}

class Artwork extends React.Component<Props, undefined> {
  handleTap() {
    SwitchBoard.presentNavigationViewController(this, this.props.artwork.href)
  }

  render() {
    const artwork = this.props.artwork
    return (
      <TouchableWithoutFeedback onPress={this.handleTap.bind(this)}>
        <View>
          <ImageView style={styles.image} aspectRatio={artwork.image.aspect_ratio} imageURL={artwork.image.url} />
          {this.artists()}
          {this.artworkTitle()}
          {this.props.artwork.partner ? <SerifText style={styles.text}>{this.props.artwork.partner.name}</SerifText> : null}
          {this.saleMessage()}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  artists() {
    const artists = this.props.artwork.artists
    if (artists && artists.length > 0) {
      return (
        <SerifText style={[styles.text, styles.artist]}>
          {map(artists, 'name').join(', ')}
        </SerifText>
      )
    } else {
      return null
    }
  }

  artworkTitle() {
    const artwork = this.props.artwork
    if (artwork.title) {
      return (
        <SerifText style={styles.text}>
          <SerifText style={[styles.text, styles.title]}>{artwork.title}</SerifText>
          {artwork.date ? (', ' + artwork.date) : ''}
        </SerifText>
      )
    } else {
      return null
    }
  }

  saleMessage() {
    const artwork = this.props.artwork
    if (artwork.is_in_auction) {
      return (
        <View style={{ flexDirection: 'row' }}>
          {/*<Image style={{ marginRight: 4 }} source={require('../../../images/paddle.png')} />*/}
          <SerifText style={styles.text}>Bid now</SerifText>
        </View>
      )
    } else {
      return artwork.sale_message && <SerifText style={styles.text}>{artwork.sale_message}</SerifText>
    }
  }
}

interface Styles {
  image: ViewStyle,
  text: TextStyle,
  artist: TextStyle,
  title: TextStyle,
}

const styles = StyleSheet.create<Styles>({
  image: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: colors['gray-semibold'],
  },
  artist: {
    fontWeight: 'bold',
  },
  title: {
    fontStyle: 'italic',
  }
})

export default Relay.createContainer(Artwork, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
        title
        date
        sale_message
        is_in_auction
        image {
          url(version: "large")
          aspect_ratio
        }
        artists {
          name
        }
        partner {
          name
        }
        href
      }
    `
  }
})