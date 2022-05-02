import { useState } from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { useTailwind } from 'tailwind-rn'
import { formatDistanceToNow } from 'date-fns'

import { Comment } from '../schemas'
import ItemSeparator from './ItemSeparator'

type CommentItemProps = {
  author: string
  time: Date
  content: string
  replies: Comment[]
}

export default function CommentItem({
  author,
  time,
  content,
  replies,
}: CommentItemProps) {
  const tw = useTailwind()
  const [showReplies, setShowReplies] = useState(false)

  return (
    <View style={tw('p-3')}>
      <View style={tw('w-full flex-row justify-between')}>
        <Text style={tw('text-orange-600')}>{author}</Text>
        <Text style={tw('text-stone-400')}>
          {formatDistanceToNow(time, { addSuffix: true })}
        </Text>
      </View>
      <AutoHeightWebView
        style={tw('m-2')}
        source={{ html: content }}
        scrollEnabled={false}
      />
      {replies.length > 0 && (
        <>
          <TouchableOpacity
            style={tw('p-2 bg-stone-300')}
            onPress={() => {
              setShowReplies(!showReplies)
            }}
          >
            <Text>
              {`${replies.length} ${
                replies.length === 1 ? 'reply' : 'replies'
              }`}
            </Text>
          </TouchableOpacity>
          {showReplies && (
            <FlatList
              style={tw('w-full')}
              data={replies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CommentItem
                  author={item.user}
                  time={item.time}
                  content={item.content}
                  replies={item.comments}
                />
              )}
              ItemSeparatorComponent={ItemSeparator}
            />
          )}
        </>
      )}
    </View>
  )
}
