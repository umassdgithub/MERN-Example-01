import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function Register() {
    const URL = "http://localhost:3000/api/auth/login"
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    
    const navigate = useNavigate()
    // 

    //submit handler
    const onsubmit = async (event)=>{
        event.preventDefault();
        try{
            let response = await fetch(URL,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({username,password})
            })
             const data = await response.json()
             const token = data.token
             if(response.ok && token){
                localStorage.setItem("token",token)
                navigate("/profile")
             }
             else{
                alert(data.msg || "Login failed!")
             }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return (<>
    <Form onSubmit={onsubmit}>
    <Form.Group className="mb-3" controlId="formGroupUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control 
        type="text" 
        value={username}  
        onChange={(e)=>setUsername(e.target.value)}
        placeholder="Enter username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Password" />
      </Form.Group>
        <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </> );
}

export default Register;




