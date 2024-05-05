import { FC, useEffect, useState } from "react"
import avatart from '../../files/img/avatar.png'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


const ChatPage: FC = () => {

    return <div>
        <Chat />
    </div>

}

const Chat = () => {

    return <div style={{ margin: '10px' }} >
        <Messages />
        <AddFromInput />
    </div>
}

const Messages: FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([])
    debugger
    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            const newMessage = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        })
    }, [])

    return <div style={{ marginBottom: '10px', height: '400px', overflowY: 'auto' }} >
        {messages.map((m: MessageType, index) => <Message message={m} key={index} />)}
    </div>
}

const Message: FC<{ message: MessageType }> = ({ message }) => {


    return <div>

        {<img style={{ height: '50px' }} src={message.photo !== null ? message.photo : avatart} alt="Avatar" />}
        <b> {message.userName} </b>

        <br />

        {message.message}

        <hr />
    </div >
}

const AddFromInput = () => {

    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) return

        ws.send(message)

        setMessage('')

    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button onClick={sendMessage}> Send </button>
        </div>
    </div>
}


export default ChatPage