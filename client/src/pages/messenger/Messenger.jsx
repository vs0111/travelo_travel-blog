import { useSelector } from "react-redux";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import "./messenger.css";
import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

function Messenger() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const authorId = useParams();

  useEffect(() => {
    socket.current = io("http://localhost:8080");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      const res = await axios.get(`/chat/getConversation/${userId}`);
      // console.log(res.data);
      setConversation(res.data);
    };
    getConversation();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get(`/message/getMessage/${currentChat._id}`);
      setMessages(res.data);
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    const res = await axios.post(`/message/addMessage`, message);
    setMessages([...messages, res.data]);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for Authors" className="chatMenuInput" />
          {conversation.map((data) => (
            <div onClick={() => setCurrentChat(data)}>
              <Conversation conversation={data} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((data) => {
                  return (
                    <div ref={scrollRef}>
                      <Message messages={data} own={data.sender === userId} conversation={data} currentUser={user} />
                    </div>
                  );
                })}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  placeholder="Message..."
                  className="chatMessageInput"
                  onChange={(e) =>setNewMessage(e.target.value)}
                  value={newMessage}
                />

                <button
                  type="submit"
                  className="chatSubmitButton"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">Start Chatting...</span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
