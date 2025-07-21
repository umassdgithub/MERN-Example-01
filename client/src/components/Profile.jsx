import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import { useState,useEffect } from 'react';
import { error } from 'xstate/lib/actionTypes';
function Profile() {
  
    const URL ="http://localhost:3000/api/profile"
    const [userInformation, setUserInformation] = useState()
    const [loading,setLoading] = useState(true)

    useEffect(()=>{

        const token = localStorage.getItem("token")
        const loadProfile = async (URL)=>{
            try{
                    const response = await fetch(URL,
                {headers:
                    {
                        "authorization": `Bearer ${token}`
                    }
            })
            const data = await response.json()
            console.log()
            setUserInformation(JSON.parse(data.profileData))
            }
            catch(err){
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        
        }
        loadProfile(URL)

    },[])



    return ( <Container>
    {loading?(
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>):
        (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{userInformation.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{userInformation.email}</Card.Subtitle>
            <Card.Text>
            Welcome to your profile!
            </Card.Text>
            {/* <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
    </Card>
        )
        
        
        }
    


    </Container> );
}

export default Profile;






