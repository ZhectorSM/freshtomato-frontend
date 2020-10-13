import React,{useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import StarRating from "../rating/StarRating";
import axios from 'axios';
import {connect} from "react-redux";
import { Rating } from 'primereact/rating';


const ListMoviesNew = (props) => {

    const {movieDto,setMovieDto, submitted, setShowDialog} = props;
    const [showRatingDialog, setShowRatingDialog] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


   

    const updateMovie = (rowData) => {
        setMovieDto({...rowData});
        setShowDialog(true);
    }

    const rateMovie = (rowData) => {
       
       console.log("rateMovie", rowData);
       setMovieDto({...rowData});
       setShowRatingDialog(true);
    }



    const hideRatingDialog = () => {   
        setShowRatingDialog(false);
        setMovieDto(props.movieInit);
    }
      //generic input handler
    const inputChangeHandler = (event) => {     
        const { id, value } = event.target    //Destructuring event
        setMovieDto({ ...movieDto, [id]: value }) //Addiing new prop
    }
    
    //Initializations
    let initialState = {
        // productDialog: false,
        // deleteProductDialog: false,
        // deleteProductsDialog: false,
        // product: this.emptyProduct,
        selectedItems: null,
        globalFilter: null
    }


    // Setter hooks    
    const [lstState, setLstState] = useState(initialState);

    const imageBodyTemplate = (rowData) => {
        
        return (<img src={!rowData.urlImage=== false ? rowData.urlImage: "https://camblycontent.files.wordpress.com/2016/12/956610-tomato.jpg"} width="100px" height="100px" onError={(e) => e.target.src='https://camblycontent.files.wordpress.com/2016/12/956610-tomato.jpg'}/> )
    }


    const [rating, setRating] = useState(null);
    const [review, setReview] = useState("");

    const sendRating = () =>{
        const {user} = props.auth;
       
      
        let ratingData = {
            user : { id: user.id },
            id: movieDto._id,
            rate: rating,
            review: review         
          }

        var config = {
            method: 'post',
            url: 'http://localhost:8000/user/rateMovie',
            headers: {
                'x-auth-token': localStorage.getItem('jwtToken')
            },
            data: ratingData
          };
       
         axios(config)
          .then(result => {
            console.log(result.data.msg);
            hideRatingDialog();            
            props.setExecuted(!props.executed);  
            alert("Movie Rated. Thanks!");            
          })
          .catch(err => {
            console.log(err);
          }); 
    }





    const actionColumnTemplate = (rowData) => { 
        const {user} = props.auth;
        return (
            <>
                
                

                { isAdmin === true ?//blocker
                   <>
                    <Button icon="pi pi-pencil" tooltip="Edit" className="p-button-rounded p-button-success p-mr-2" onClick={() => updateMovie(rowData)} />
                    <Button icon="pi pi-trash" tooltip="Delete" className="p-button-rounded p-button-warning p-mr-2" onClick={() => props.deleteMovie(rowData._id)} />
                    <Button icon="pi pi-star" tooltip="Rate" className="p-button-rounded p-button-info p-mr-2" onClick={() => rateMovie(rowData)} />
                   </> 
                :
                    <>
                        <Button icon="pi pi-star" tooltip="Rate" className="p-button-rounded p-button-info p-mr-2" onClick={() => rateMovie(rowData)} />
                    </>
                } 
            </>
        )
    }

    const LeftToolbarTemplate = () => {   
        const {user} = props.auth;  
        return (            
            <>
            { isAdmin === true ?//blocker
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={props.openDialog} />                
            </> 
            :
            <>               
            </>
            }
            </>
        )       
        
    }



    const dialogFooter = (//this is a not s component       
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={props.hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={props.saveMovie} />
        </>
    
    )


    const dialogRatingFooter = (//this is a not s component       
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideRatingDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={sendRating} />
        </>
    
    )


    const ratingBodyTemplate = (rowData) => {
        return (<><Rating value={rowData.rate} readonly cancel={false} tooltip={"Rate: " + rowData.rate}/> </>);
    }

    return (
        <>
            <div className="card">
            <Toolbar className="p-mb-4" left={LeftToolbarTemplate}></Toolbar>

            {/* List */}
            <DataTable value={props.listMovies} selection={lstState.selectedItems} onSelectionChange={(e) => setLstState({ ...lstState, selectedItems: e.value })}
                dataKey="movieId" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Movies"
                globalFilter={lstState.globalFilter}  
                className="datatable-forms">
                {/* <Column field="_id" header="Id"></Column> */}
                <Column header="" body={imageBodyTemplate}></Column>    
                <Column field="name" header="Name" sortable></Column>                    
                <Column field="description" header="Description" sortable></Column>                                                         
                <Column field="length" header="Length"></Column>                             
                <Column field="year" header="Year"></Column>                             
                <Column field="category" header="Category"></Column>   
                <Column field="rate" header="Reviews" body={ratingBodyTemplate} sortable></Column>               
                <Column header="Actions" body={actionColumnTemplate} ></Column>                                          
            </DataTable>
            </div>   

            {/* Add and edit form  */}
            <Dialog visible={props.showDialog}  header="Movie Details" modal className="p-fluid dialog-movie" footer={dialogFooter} onHide={props.hideDialog}>               
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={movieDto.name} onChange={(e) => inputChangeHandler(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !movieDto.name })} />
                    {submitted && !movieDto.name && <small className="p-invalid">Name is required.</small>}
                </div>       
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={movieDto.description} onChange={(e) => inputChangeHandler(e)} required rows={15} cols={50} />
                </div>
                <div className="p-field">
                <label htmlFor="length">Length</label>
                 <InputText id="length" value={movieDto.length} onChange={(e) => inputChangeHandler(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !movieDto.length })} />
                 {submitted && !movieDto.length && <small className="p-invalid">Length is required.</small>}
                </div>
                <div className="p-field">
                <label htmlFor="year">Year</label>
                 <InputText id="year" value={movieDto.year} onChange={(e) => inputChangeHandler(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !movieDto.year })} />
                 {submitted && !movieDto.year && <small className="p-invalid">Year is required.</small>}
                 </div>
                 <div className="p-field">
                 <label htmlFor="category">Category</label>
                 <InputText id="category" value={movieDto.category} onChange={(e) => inputChangeHandler(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !movieDto.category })} />
                 {submitted && !movieDto.category && <small className="p-invalid">Category is required.</small>}
                 </div> 
                 <div className="p-field">
                 <label htmlFor="urlImage">Url Image</label>
                 <InputText id="urlImage" value={movieDto.urlImage} onChange={(e) => inputChangeHandler(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !movieDto.urlImage })} />
                 {submitted && !movieDto.urlImage && <small className="p-invalid">Url Image is required.</small>}
                 </div> 
            </Dialog>


            <Dialog visible={showRatingDialog}  header="Rating" modal className="p-fluid dialog-movie" footer={dialogRatingFooter} onHide={hideRatingDialog}>               
                <StarRating className="star" 
                movieId={movieDto._id} 
                rating={rating}
                setRating={setRating}
                review={review}
                setReview={setReview}
                />
            </Dialog>

        </>
    )
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(ListMoviesNew);
