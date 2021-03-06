// @flow
import {PermissionsAndroid} from 'react-native'
import React, {Component} from 'react'
import type {Props} from './index'
import {NativeImage, Box, Text} from '../../../../common-adapters/index.native'
import {globalStyles} from '../../../../styles'

type State = {
  permissionGranted: ?boolean,
}

class QR extends Component<void, Props, State> {
  state: State;

  constructor (props: Props) {
    super(props)
    this.state = {
      permissionGranted: null,
    }

    this.requestCameraPermission()
  }

  async requestCameraPermission () {
    try {
      const granted = await PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.CAMERA, {
          'title': 'Keybase Camera Permission',
          'message': 'Keybase needs access to your camera so we can scan your codes',
        }
      )

      this.setState({permissionGranted: granted})
    } catch (err) {
      console.warn(err)
      this.setState({permissionGranted: false})
    }
  }

  render () {
    if (this.props.scanning) {
      if (this.state.permissionGranted) {
        return <Text type='Body'>TODO</Text>
        // return <BarcodeScanner
          // onBarCodeRead={this.props.onBarCodeRead}
          // style={this.props.style || {flex: 1}}
          // torchMode='off'
          // cameraType='back' />
      } else {
        if (this.state.permissionGranted === false) {
          return <Text type='Body'>Couldn't get camera permissions</Text>
        } else {
          return <Text type='Body'>Waiting for permissions</Text>
        }
      }
    } else {
      return (
        <Box style={{flex: 1, ...globalStyles.flexBoxColumn, ...this.props.style}}>
          {this.props.children}
          <NativeImage style={[{width: 300, height: 300}, this.props.imageStyle]} source={{uri: this.props.qrCode}} />
        </Box>
      )
    }
  }
}

export default QR
