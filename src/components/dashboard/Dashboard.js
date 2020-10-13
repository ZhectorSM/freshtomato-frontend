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
    // componentDidMount() {
    //     var config = {
    //         method: 'get',
    //         url: 'http://localhost:8000/user/listMovies',
    //         headers: {
    //             'x-auth-token': localStorage.getItem('jwtToken')
    //         }
    //     };
    //     Axios(config)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    // }

    render() {
        const {user} = this.props.auth;
        console.log(user)
        return (
            <div>
                <Header/>
                    <MainMovies/>
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