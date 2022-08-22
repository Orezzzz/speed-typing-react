import React from "react"
import { useState, useEffect, useRef } from "react"


export default function App(){

    const startingTime = 60
    const paragraph = `Someone humorously remarked that our age can be called “The Plastic Age". Plastic is a non-biodegradable substance. It does not assimilate with soil and reduces the fertility of the land. It cannot be recycled automatically and harms the life cycle on the earth. But, plastic is replacing the traditional use of jute, cotton, or paper materials and is becoming a menace to the living world. Children run the risk of being suffocated while playing with plastic bags. Colored plastic carry-bags cause poisoning of the food. Plastic wastes, if not carefully disposed of, very often lead to the choking of the sewage system.`
    const staticWords = paragraph.trim().split(" ")
    const staticWordsArr = staticWords.filter(word => word !== "")




    const [text, setText] = useState("");
    const[timeRemaining, setTimeRemaining] = useState(startingTime);
    const[isTimeRunning, setIsTimeRunning] = useState(false);
    const [score, setWordCount] = useState(0);
    const textBoxRef = useRef(null)

    function handleChange(event){
        const {value} = event.target;
        setText(value);
    }

    function calculateWordCount(text){
        const words = text.trim().split(" ")
        const wordsArr = words.filter(word => word !== "")
        let count = 0;
        for(let i=0; i<staticWordsArr.length; i++){ 
            if(staticWordsArr[i] == wordsArr[i])
                count++;
        }
        return count;
    }

    function startTyping(){
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
        setTopPlayers([])
    }

    function endTyping(){
        setIsTimeRunning(false) 
        setWordCount(calculateWordCount(text))

            const login ={name, password, score}
            console.log(login)

            fetch("https://speed-typing-game-play.herokuapp.com/update/" + name +"/"+ password,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(login)
            
            }).then((response)=>{
                if (!response.ok) {
                    alert("Invalid username and password")
                    throw new Error('Network response was not OK');
                }
                else
                setShowLogin(false)

                
                fetch("https://speed-typing-game-play.herokuapp.com/getTopPlayers")
            .then(res=>res.json())
            .then((result)=> { 
                setTopPlayers(result)
            })

            })    

    }

    useEffect(()=> {
        if(isTimeRunning && timeRemaining > 0){
            setTimeout(()=> {
                setTimeRemaining((time)=> time - 1)
            }, 1000)
        }
        else if(timeRemaining === 0){
            endTyping()
        }
    }, [timeRemaining, isTimeRunning])




        const [showLogin, setShowLogin] = useState(false)
        const [showSignUp, setShowSignUp] = useState(true) 

        const [name, setUserName] = useState("")
        const [password, setPassWord] = useState("")
        const [ConfirmPassWord, setConfirmPassWord] = useState("")
        const [topPlayers, setTopPlayers] = useState([])


    
    
        function handleClickSignUp(e){
            e.preventDefault()
            const login ={name, password}
            console.log(login)

            fetch("https://speed-typing-game-play.herokuapp.com/update/" + name +"/"+ password,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(login)
            
            }).then((response)=>{
                if (!response.ok) {
                    fetch("https://speed-typing-game-play.herokuapp.com/add",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(login)
                    
                    }).then(()=>{
                        console.log("New student added")
                        if(showSignUp)
                        setShowSignUp(false)
                    })
                    throw new Error('Network response was not OK');
                }
                else{
                    alert("This username and password is already taken.")
                }
                
            })
        }    
    

        function hideSignUp(){
            setUserName("")
            setPassWord("")
            if(showSignUp){
                setShowSignUp(false)
                setShowLogin(true)
            }
            

        }

        function handleClickLogin(e){
            e.preventDefault()
            const login ={name, password}
            console.log(login)

            fetch("https://speed-typing-game-play.herokuapp.com/update/" + name +"/"+ password,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(login)
            
            }).then((response)=>{
                if (!response.ok) {
                    alert("Invalid username and password")
                    throw new Error('Network response was not OK');
                }
                else
                setShowLogin(false)

                
            })
        }

        function hideLogin(){
            setUserName("")
            setPassWord("")
            if(showLogin){
                setShowLogin(false)
                setShowSignUp(true)
            }

        }


            useEffect(()=> {
                fetch("https://speed-typing-game-play.herokuapp.com/getTopPlayers")
            .then(res=>res.json())
            .then((result)=> { 
                setTopPlayers(result)
                console.log(result)
            })
            },[])

            console.log(topPlayers)

            const topPlayersList = topPlayers.map(topplayers => {
                return<h3> {topplayers.name +"     -     "}     {topplayers.score}</h3>

                  
                
            })






    return (
        <div>
        { showSignUp && 
        <div className="modal">
        <form className="modal-content animate" method="post">
            <div className="signup-login-head">
                <h2 className="signup-login-text">Sign up</h2>     
                <span className="close" title="Close Modal" >&times;</span>   
            </div>     
        

            <div className="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required onChange={e => setUserName(e.target.value)}/>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Minimun 8-characters" name="psw" required onChange={e => setPassWord(e.target.value)}/>
            <label for="cpsw"><b>Confirm Password</b></label>
            <input type="password" placeholder="Re-enter Password" name="cpsw" required onChange={e => setConfirmPassWord(e.target.value)}/>
    

            <button onClick={handleClickSignUp} disabled = {((password.length >= 8 && password == ConfirmPassWord)&& password != null) ? false : true} type="submit">Submit</button>

            </div>

            <div className="container" >
                <button type="button"  className ="cancelbtn" onClick={hideSignUp}>Log in</button>
            </div>
        </form>
    </div>}


    <div>
      {showLogin && <div className="modal">
            <form className="modal-content animate" method="post">
                <div className="signup-login-head">
                    <h2 className="signup-login-text">Log in</h2>     
                    <span className="close" title="Close Modal" onClick={hideLogin}>&times;</span>   
                </div>  

                <div className="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required onChange={e => setUserName(e.target.value)}/>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required onChange={e => setPassWord(e.target.value)}/>
        
                <button disabled = {(password.length >= 3) ? false : true} type="submit" onClick={handleClickLogin}>Submit</button>
                </div>

                <div className="container" >
                    <button type="button"  className ="cancelbtn" onClick={hideLogin}>Sign up</button>
                </div>
        </form>
        </div>
        }
    </div>
        
    


        <div>
            <h1>How fast do you type?</h1>
            <textarea 
                className="textarea-dynamic"
                disabled
                value = {paragraph}
            />
            <textarea 
                className="textarea-dynamic"
                ref={textBoxRef}
                onChange = {handleChange}
                value = {text}
                disabled={!isTimeRunning}
            />
            <h4> Time remaining: {timeRemaining}</h4>
            <button className="start-button"
                onClick={startTyping}
                disabled={isTimeRunning}
            >Start</button>
            <h1>Your Score: {score}</h1>
        </div>   

        
         <div>
            <h1 className="top-scores">Top Scorers</h1>
         </div>   
           <div>
            {topPlayersList}
                     
            </div> 

        </div>
    )
}