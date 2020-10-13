import React, {useState,useEffect} from 'react'
import axios from 'axios';
import ListFormsNew from './ListMoviesNew'

const MainMovies = () => {


    // Initial state movie dto
    const movieInit = {
        _id : null,
        name : "",
        description : "",
        length : "",
        year: null,
        category: "",
        urlImage : "" ,
        rate : 0 
    };

    const [movieDto, setMovieDto] = useState(movieInit);
    const [listMovies, setListMovies] = useState([]);
    const [executed, setExecuted] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const openDialog = () => {  
        console.log("opnedlg");          
        // setmovieDto(movieInit);
        // setSubmitted(false);
        setShowDialog(true);        
    }

    const hideDialog = () => {   
        setMovieDto(movieInit);
        setSubmitted(false);     
        setShowDialog(false);
    }


    //List method
    useEffect(() => {    


        var config = {
            method: "get",
            url: "http://localhost:8000/user/listMovies",
            headers: {
              "x-auth-token": localStorage.getItem("jwtToken")
            }
          };
      
        axios(config)
        .then(result => {        
            setListMovies(result.data);
        })
        .catch(err => {
              alert(err);
        });

    },  [executed]);//Monitoring is succesful to update list


    //Insert and update form
    const saveMovie = () => { 
       
        setSubmitted(true);
        
        //field validation
        if(movieDto.name.trim()){

            //dynamic config of request 
            const urlSaveMovie = (movieDto._id === null ? 'http://localhost:8000/admin/createMovie' :'http://localhost:8000/admin/updateMovie');
            

            const config = {
                method: 'post',
                url: urlSaveMovie,
                headers: { 
                  "x-auth-token": localStorage.getItem("jwtToken"),
                  'Content-Type': 'application/json; charset=UTF-8'
                },
                data : movieDto
            };
            

            axios(config)
            .then( success => {
                if(success){
                    setExecuted(!executed);  
                    alert("Movie saved");
                }else{                    
                    console.log("error");
                }
                //clear data
                setMovieDto(movieInit);
                hideDialog();
            }).catch(error => {
                setExecuted(!executed)                
            });            
        }

        setSubmitted(false);
        
    }


    const deleteMovie = (idMovie) => {     
        
        var config = {
            method: "post",
            url: "http://localhost:8000/admin/deleteMovie",
            headers: {
              "x-auth-token": localStorage.getItem("jwtToken")
            },
            data: {
              id : idMovie
            }
          };
      
          axios(config)
            .then(success => {
                if(success){
                    setExecuted(!executed);
                    alert("Deleted suceesfully");
                }else{                    
                    alert("Error deleting")
                }
            })
            .catch(error => {
                setExecuted(!executed);
                
            });    
        
    }


    return (
        <>
            <ListFormsNew 
                listMovies={listMovies}
                movieDto={movieDto}
                showDialog={showDialog}
                submitted={submitted}
                executed={executed}
                setExecuted={setExecuted}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie} 
                setMovieDto={setMovieDto}
                openDialog={openDialog}
                hideDialog={hideDialog}
                setShowDialog={setShowDialog}
                movieInit={movieInit}/>
        </>
    )
}


export default MainMovies;