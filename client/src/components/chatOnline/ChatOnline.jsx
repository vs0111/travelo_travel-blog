import './chat-online.css'
import img from '../../assets/images/ava-3.jpg'

function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src={img} alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Vishnu</span>
        </div>
    </div>
  )
}

export default ChatOnline