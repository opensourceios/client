// @flow
import {List} from 'immutable'
import Conversation from './index'
import {connect} from 'react-redux'
import {loadMoreMessages} from '../../actions/chat'

import type {TypedState} from '../../constants/reducer'

export default connect(
  (state: TypedState) => {
    const selectedConversation = state.chat.get('selectedConversation')

    if (selectedConversation) {
      const conversationState = state.chat.get('conversationStates').get(selectedConversation)
      if (conversationState) {
        return {
          messages: conversationState.messages,
          moreToLoad: conversationState.moreToLoad,
          isLoading: conversationState.isLoading,
        }
      }
    }

    return {
      messages: List(),
      moreToLoad: false,
      isLoading: false,
    }
  },
  (dispatch: Dispatch) => ({
    loadMoreMessages: () => dispatch(loadMoreMessages()),
  }),
)(Conversation)
