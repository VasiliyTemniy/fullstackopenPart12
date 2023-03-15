import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const type = useSelector((state) => state.notification.type)

  if (message === null || message === '') {
    return null
  }

  const style = {
    position: 'absolute',
    zIndex: 101,
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    opacity: 0,
    animation: 'toggle-visibility-notificaion 5s forwards ease-in-out',
  }

  return <div style={style}>{message}</div>
}

Notification.displayName = 'Notification'

export default Notification
