import React, {useState, useRef, useEffect} from 'react';
import './App.css';

import Message from './Message';
import Header from './Header';
import DateHeader from './DateHeader';
import Keyboard from './Keyboard';


function ChatPane() {
    const [messages, setMessages] = useState([{"type": "readFlair", "content": ["Delivered", ""]}]);
    const [isHidden, setIsHidden] = useState("block");
    const inputTextRef = useRef(null);
    const inputRadioRef = useRef(null);
    const scrollPaneRef = useRef(null);



    function addMessage(newMsg, msgType) {
        if(msgType === "sender") {
            setMessages((prevMessages) => [...prevMessages, {"type": "clientMsg", "content": newMsg}]);

        } else if(msgType === "reciever") {
            setMessages((prevMessages) => [...prevMessages, {"type": "serverMsg", "content": newMsg}]);

        } else {
            let m = newMsg.split(",")
            setMessages((prevMessages) => [...prevMessages, {"type": "date", "content": m}]);
        }
    }

    function sendMessage(msg) {
        setMessages((prevMessages) => prevMessages.filter(item => item["type"] !== "readFlair"));
        setMessages((prevMessages) => [...prevMessages, 
            {"type": "clientMsg", "content": msg},
            {"type": "readFlair", "content": ["Delivered", ""]}]);              // TODO: Change this text accordingly
    }


    useEffect(() => {
        scrollPaneRef.current.scrollTop = scrollPaneRef.current.scrollHeight;
    }, [messages]);





    return (
        <div ref = {scrollPaneRef} className= "disable-scrollbars" style={{width:"100%", height:"100%", overflowY:"scroll",overscrollBehaviorY:"none"}}>
            <Header name = {"Joseph"} func = {setIsHidden}/>
            
            <div className='date'><span style={{fontWeight:"bold"}}>Text Message</span></div>


            {/* This block of code is temporary to show what a fully fleshed out chat could look like. Lorem Ipsum */}
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



            {messages.map((item, idx) => {
                switch(item["type"]) {
                    case "clientMsg":
                        return <Message msg = {item["content"]}
                                        key = {idx} 
                                        msgStyle = {"clientMsg"} 
                                        btnStyle = {isHidden}/>

                    case "serverMsg":
                        return <Message msg = {item["content"]}
                                        key = {idx}
                                        msgStyle = {"serverMsg"}
                                        btnStyle = {isHidden}/>

                    case "date":
                        return <DateHeader  date = {item["content"][0]}
                                            time = {item["content"][1]}
                                            key = {idx}
                                            btnStyle = {isHidden} />

                    case "readFlair":
                        return <div key = "readFlair" className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777"}}><span style={{ fontWeight:"bold"}}>{item["content"][0]}</span> {item["content"][1]}</div>
                }
            })}

            {/* These were two entries for the readFlare */}
            {/* <p  className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777", fontWeight:"bold"}}>Delivered</p> */}
            {/* <div className='chatMsg'  style ={{marginLeft:"auto", padding:"0px",marginTop:"0px",fontSize:"0.6em", color:"#777777"}}><span style={{ fontWeight:"bold"}}>Read</span> 3:06 PM</div> */}

            
        
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



            <Keyboard createMessage = {sendMessage} />
            
        </div>

    )
}

export default ChatPane