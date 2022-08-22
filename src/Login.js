import { useState } from "react"
import React from "react"
import { Link } from "react-router-dom"
import useWordGame from "./useWordGame"


export default function LoginOrSignUp(){

    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)

    function LoginIds(){

        const [userName, setUserName] = useState("")
        const [passWord, setPassWord] = useState("")
    
        console.log(userName)
        console.log(passWord.length)

        function handleClick(e){
            e.preventDefault()
            const login ={userName, passWord}
            console.log(login)
            fetch("http://localhost:8080",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(login)
            
            }).then(()=>{
                console.log("New student added")
            })

        }

        return(
 
        <div className="modal">
            <form className="modal-content animate" method="post">
                <div className="signup-login-head">
                    <h2 className="signup-login-text">Login</h2>     
                    <span className="close" title="Close Modal" onClick={hideLogin}>&times;</span>   
                </div>  

                <div className="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required onChange={e => setUserName(e.target.value)}/>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required onChange={e => setPassWord(e.target.value)}/>
        
                <Link to="/game">
                <button disabled = {(passWord.length >= 8) ? false : true} type="submit" onClick={handleClick}>Login</button>
                <useWordGame 
                    userName = {userName}
                    passWord = {passWord} 
                />
                </Link>

                </div>

                <div className="container" >
                    <button type="button"  className ="cancelbtn" onClick={hideLogin}>Cancel</button>
                </div>
        </form>
        </div>
        )
    }

    function SignUp(){

        const [userName, setUserName] = useState("")
        const [passWord, setPassWord] = useState("")
        const [ConfirmPassWord, setConfirmPassWord] = useState("")
    
        console.log(userName)
        console.log(passWord.length)

        return(
 
        <div className="modal">
            <form className="modal-content animate" method="post">
                <div className="signup-login-head">
                    <h2 className="signup-login-text">Sign up</h2>     
                    <span className="close" title="Close Modal" onClick={hideSignUp}>&times;</span>   
                </div>     
            

                <div className="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required onChange={e => setUserName(e.target.value)}/>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required onChange={e => setPassWord(e.target.value)}/>
                <label for="cpsw"><b>Confirm Password</b></label>
                <input type="password" placeholder="Re-enter Password" name="cpsw" required onChange={e => setConfirmPassWord(e.target.value)}/>
        
                <Link to="/game">
                <button disabled = {(passWord.length >= 8 && passWord == ConfirmPassWord) ? false : true} type="submit">Login</button>
                <useWordGame 
                    userName = {userName}
                />
                </Link>

                </div>

                <div className="container" >
                    <button type="button" onClick={hideSignUp} className ="cancelbtn">Cancel</button>
                </div>
        </form>
        </div>
        )
    }    

    function hideLogin(){
        if(showLogin)
        setShowLogin(false)
    }

    function handleClickLogin(){
        if(!showLogin)
        setShowLogin(true)
    }

    function hideSignUp(){
        if(showSignUp)
        setShowSignUp(false)
    }

    function handleClickSignUp(){
        if(!showSignUp)
        setShowSignUp(true)
    }    



    return (
      <div>
        <input type="submit" value="login" onClick={handleClickLogin} />
        {showLogin ? <LoginIds />  : null}
        <useWordGame showLogin={showLogin}/>
            
        <input type="submit" value="sign up" onClick={handleClickSignUp} />
        {showSignUp ? <SignUp />  : null}
      </div>
      

        
    )
}
