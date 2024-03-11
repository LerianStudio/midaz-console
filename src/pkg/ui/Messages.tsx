import { UiText } from '@ory/client'

interface MessageProps {
  message: UiText
}

export const Message = ({ message }: MessageProps) => {
  return (
    // <Alert severity={message.type === 'error' ? 'error' : 'info'}>
    //   <AlertContent data-testid={`ui/message/${message.id}`}>
    //     {message.text}
    //   </AlertContent>
    // </Alert>
    <h1>...</h1>
  )
}

interface MessagesProps {
  messages?: Array<UiText>
}

export const Messages = ({ messages }: MessagesProps) => {
  if (!messages) {
    // No messages? Do nothing.
    return null
  }

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}
