import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Header from "../Header";
import Footer from "../Footer";
import Axios from "axios";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    componentDidMount() {
        var config = {
            method: 'get',
            url: 'http://localhost:8000/user/listMovies',
            headers: {
                'x-auth-token': localStorage.getItem('jwtToken')
            }
        };
        Axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        const {user} = this.props.auth;
        console.log(user)
        return (<div>
                <Header/>
                <div style={{height: "75vh"}} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b style={{color:"black"}}>Hey there,</b> {user.name.split(" ")[0]}
                                <p className="flow-text grey-text text-darken-1">
                                    You are logged into a full-stack{" "}
                                    <span style={{fontFamily: "monospace"}}>MERN</span> app 👏
                                </p>
                            </h4>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {logoutUser}
)(Dashboard);