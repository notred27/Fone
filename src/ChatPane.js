import React, {useState, useRef, useEffect} from 'react';
import './app.css';

import Message from './Message';
import Header from './Header';
import DateHeader from './DateHeader';
import Keyboard from './Keyboard';


function ChatPane() {
    const [messages, setMessages] = useState([]);
    const inputTextRef = useRef(null);
    const inputRadioRef = useRef(null);
    const scrollPaneRef = useRef(null);


    function addMessage(newMsg, msgType) {
        if(msgType === "sender") {
            setMessages((prevMessages) => [...prevMessages, <Message key = {prevMessages.length} msg = {newMsg} msgStyle = {"clientMsg"}/>])

        } else if(msgType === "reciever") {
            setMessages((prevMessages) => [...prevMessages, <Message key = {prevMessages.length} msg = {newMsg} msgStyle = {"serverMsg"} />])
            
        } else {
            let m = newMsg.split(",")
            setMessages((prevMessages) => [...prevMessages, <DateHeader key = {prevMessages.length} date = {m[0]} time = {m[1]} />])

        }
    }

    function sendMessage(msg) {
        setMessages((prevMessages) => [...prevMessages, <Message key = {prevMessages.length} msg = {msg} btnStyle = {"none"} msgStyle = {"clientMsg"}/>])
    }


    useEffect(() => {
        scrollPaneRef.current.scrollTop = scrollPaneRef.current.scrollHeight;
    }, [messages])





    return (
        <div ref = {scrollPaneRef} className= "disable-scrollbars" style={{width:"100%", height:"100%", overflowY:"scroll",overscrollBehaviorY:"none"}}>
            <Header name = {"Joseph"} />
            
            <div className='date' ><span style={{fontWeight:"bold"}}>Text Message</span></div>
            <DateHeader date ={"Today"} time={"12:19 PM"} />
            
            
            <Message msg ={"Hello world!"} msgStyle = {"clientMsg"} />
            <Message msg={"This is a response!"}  msgStyle = {"serverMsg"}/>
            <Message msg ={"Hello world2!"} msgStyle = {"clientMsg"}/>
            <Message msg ={"Is the world even here? Is the world even here? Is the world even here?"} msgStyle = {"clientMsg"} />
            <Message msg ={"Hello world!"} msgStyle = {"clientMsg"}/>
            <Message msg={"This is a response!"}  msgStyle = {"serverMsg"}/>
            <Message msg ={"Hello world2!"} msgStyle = {"clientMsg"}/>
            <Message msg ={"Is the world even here?"} msgStyle = {"clientMsg"} />
            <Message msg ={"Hello world!"} msgStyle = {"serverMsg"}/>
            <Message msg={"This is a response!"} msgStyle = {"serverMsg"}/>
            <Message msg ={"Hello world2!"} msgStyle = {"clientMsg"}/>

            <DateHeader date ={"Today"} time={"3:06 PM"} />

            <Message msg ={"Is the world even here?"} msgStyle = {"serverMsg"}/>
            <Message msg ={"Hello world!"} msgStyle = {"clientMsg"}/>
            <Message msg={"This is a response!"} msgStyle = {"serverMsg"}/>
            <Message msg ={"Hello world2!"} msgStyle = {"clientMsg"}/>
            <Message msg ={"Is the world even here?"} msgStyle = {"clientMsg"}/>
            <Message msg ={"woot!"} msgStyle = {"clientMsg"}/>


            <Message msg ={"Yessss"} msgStyle = {"clientMsg"}/>



            {messages}

            <p  className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777", fontWeight:"bold"}}>Delivered</p>
            <div className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777"}}><span style={{ fontWeight:"bold"}}>Read</span> 3:06 PM</div>

        
        <div className="HideButton" style = {{position:"sticky", bottom:"0px", padding:"10px", backgroundColor:"#ECECEC"}}>
            <form ref = {inputRadioRef} >
                <input type="radio" id = "addType0" name="addType" value = "sender"/>
                <label >Sent Msg</label>

                <input type="radio" id = "addType1" name="addType" value = "reciever"/>
                <label >Recieved Msg</label>

                <input type="radio" id = "addType2" name="addType" value = "header"/>
                <label >Time</label>
            </form>

            <input id ="chat_adder" ref = {inputTextRef}></input>
            <button onClick={() => (addMessage(inputTextRef.current.value, inputRadioRef.current.elements["addType"].value))}>Add message</button>
        </div>



        <Keyboard createMessage = {sendMessage}></Keyboard>
            
        </div>

    )
}

export default ChatPane