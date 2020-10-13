import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Header from "../Header";
import Footer from "../Footer";
import Axios from "axios";
import MainMovies from "./MainMovies"

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const {user} = this.props.auth;
        console.log(user)
        return (
            <div>
                {/* <Header/> */}
                <div style={{height: "15vh"}} className="container valign-wrapper">
                    <div className="row">
                        <div className="col">
                            <p>
                                <b style={{color:"black"}}>Hey there,</b> {user.name.split(" ")[0]}                                
                            </p>
                            <button
                                style={{
                                    width: "120px",
                                    borderRadius: "3px"
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
                    <MainMovies/>
                {/* <Footer/> */}
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