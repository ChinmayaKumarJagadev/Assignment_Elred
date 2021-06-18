import React, {useEffect,useState} from 'react'
import logo from './logo.svg';
import {useSelector,useDispatch} from 'react-redux'
import {userDataRecords} from './actions/index'
import axios from 'axios';
import './App.css';


const App = () =>{
  const [searchItem, setSearchItem] =useState('')
  

  const userData = useSelector(state => state.allUserData.userInfo)
  console.log(userData)
  const dispatch= useDispatch()

  const [preview, setPreview] = useState(userData[0])



  const fetchUserdata = () =>{
    return axios.get("https://pixabay.com/api/?key=22117679-eeb8b0881163e010257138de5&q=yellow+flowers&image_type=photo&pretty=true")
    .then((res) =>{
      console.log(res)
      console.log(res.data.hits)
       dispatch(userDataRecords(res.data.hits))
    })
    .catch((err) =>{
      console.log(err)
    })
  }


  useEffect (() =>{
    fetchUserdata()
  },[])



  return (
    <div className="App">
      <p>React</p>
         
      <input type="text"  name="search" placeholder="Search for Image name.." onChange={event =>{setSearchItem(event.target.value)}}/>

       <div style={{marginRight: "1900px", width: "300px" ,fontFamily: "bold",fontSize: "20px"}}>
          Chinmaya Gallery
       </div>


      { userData.filter((data) =>{
           if(searchItem == "")
              return data
           else if(data.previewURL.toLowerCase().includes(searchItem.toLocaleLowerCase())){
              return data
           }
      }).map((data, id) =>{
        //console.log(data)
         return(
           <img
             style={{ border: preview === data.previewURL ? "4px solid purple" : "" }}
             key={id}
             src={data.previewURL}
             alt="image"
             onClick={() => setPreview(data.previewURL)}
    /> 
    )    
  }) 
}
  
    <img src={preview} alt="Selected" className="selected"/> 
    {preview}
    </div>
  );
  }
  
export default App;

