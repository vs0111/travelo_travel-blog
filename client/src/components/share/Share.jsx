import "./share.css";
import  {useState}  from "react";
import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material"
import img from '../../assets/images/ava-3.jpg'
import EditProfilePic from "../EditProfilePic";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ProgressBar,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter
  } from "react-bootstrap";

export default function Share() {
    const [fileShow,setFileShow]=useState(false)

    

          

  return (
    <>
    <div className="share">
      <div className="shareWrapper">
    
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption" onClick={()=>setFileShow(true)}>
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText"> Share Your Memories...</span>
                </div>
           
                
                
            </div>
            {/* <button className="shareButton">Share</button> */}
        </div>
      </div>
    </div>
    <Modal show={fileShow}>
        <ModalHeader>
          <ModalTitle>EDIT PROFILE</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <EditProfilePic />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={()=>setFileShow(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}