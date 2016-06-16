import React, {Component} from 'react'
import {connect} from 'react-redux'
import {routeAppend} from '../actions/router'
import {switchTab} from '../actions/tabbed-router'
import {pushNewProfile} from '../actions/profile'
import {pushNewSearch} from '../actions/search'
import {logout} from '../actions/login'
import {pushDebugTracker} from '../actions/tracker'
import MenuList from '../settings/menu-list'
import RemoteComponent from '../../desktop/renderer/remote-component'

import {loginTab} from '../constants/tabs'
import engine from '../engine'
import developer from './developer'
import login from '../login'
import pinentry from '../pinentry'
import tracker from '../tracker'
import componentsUpdate from './components-update'
import styleSheet from './style-sheet'
import dumbSheet from './dumb-sheet'

class Foo extends Component {
  render () {
    const payload = {
      features: {
        secretStorage: {allow: true, label: 'store your test passphrase'}
      },
      prompt: 'Enter a test passphrase',
      retryLabel: '',
      windowTitle: 'Keybase Test Passphrase'
    }
    return (
      <RemoteComponent
        component='pinentry'
        {...payload} />)
  }
}

class DevMenu extends Component {
  render () {
    const menuItems = [
      {name: 'Login', onClick: () => {
        this.props.switchTab(loginTab)
      }},
      {name: 'Register', onClick: () => {
        this.props.switchTab(loginTab)
        this.props.routeAppend(['register'])
      }},
      {name: 'reset', onClick: () => {
        engine.reset()
        console.log('Engine reset!')
      }},
      {name: 'Sign Out', onClick: () => {
        this.props.logout()
      }},
      {name: 'Passphrase entry', onClick: () => {
        this.props.routeAppend('pinentry')
      }},
      {name: 'Developer', hasChildren: true, onClick: () => {
        this.props.routeAppend('developer')
      }},
      {name: 'Search', hasChildren: true, onClick: () => {
        this.props.pushNewSearch()
      }},
      {name: 'Profile', hasChildren: true, onClick: () => {
        this.props.pushNewProfile('test12')
      }},
      {name: 'Tracker Listener', hasChildren: true, onClick: () => {
        this.props.showTrackerListener('max')
      }},
      {name: 'Remote Window', hasChildren: true, onClick: () => {
        this.props.routeAppend([{parseRoute: {componentAtTop: {component: Foo}}}])
      }},
      {name: 'Components (Update)', hasChildren: true, onClick: () => {
        this.props.routeAppend(['componentsUpdate'])
      }},
      {name: 'Dumb components', hasChildren: true, onClick: () => {
        this.props.routeAppend(['dumbSheet'])
      }},
      {name: 'Stylesheet', hasChildren: true, onClick: () => {
        this.props.routeAppend(['styleSheet'])
      }}
    ]
    return (
      <MenuList items={menuItems} />
    )
  }

  static parseRoute () {
    return {
      componentAtTop: {title: 'Dev Menu'},
      subRoutes: {developer, login, pinentry, tracker, componentsUpdate, styleSheet, dumbSheet}
    }
  }
}

export default connect(
  null,
  dispatch => {
    return {
      routeAppend: uri => dispatch(routeAppend(uri)),
      switchTab: tabName => dispatch(switchTab(tabName)),
      logout: () => dispatch(logout()),
      pushNewSearch: () => dispatch(pushNewSearch()),
      pushNewProfile: username => dispatch(pushNewProfile(username)),
      showTrackerListener: username => dispatch(pushDebugTracker(username))
    }
  }
)(DevMenu)