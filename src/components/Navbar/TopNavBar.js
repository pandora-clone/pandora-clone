// import React, { Component } from "react";
// import { connect } from "react-redux";
// import SpotifyWebApi from "spotify-web-api-js";

// import { getUser } from "../../redux/userReducer";

// const spotifyApi = new SpotifyWebApi();

// class TopNavBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       profilePic: "",
//       id: ""
//     };
//     this.getMe = this.getMe.bind(this);
//   }

//   getMe() {
//     spotifyApi.getMe().then(response => {
//       console.log(response);
//       response.images[0] === undefined
//         ? this.setState({
//             name: response.display_name,
//             id: response.id,
//             profilePic:
//               "https://gaia.ub.edu/twiki/pub/Main/UserProfileHeader/default-user-profile.jpg"
//           })
//         : this.setState({
//             name: response.display_name,
//             id: response.id,
//             profilePic: response.images[0].url
//           });
//     });
//   }

//   componentDidMount() {
//     this.getMe();
//   }

//   render() {
//     console.log(this.props);
//     return (
//       <div className="topNavContainer">
//         {/* <button onClick={this.props.getUser}>Check users</button> */}
//         {this.props.user.user_id ? (
//           <a
//             href="http://localhost:8888/logout"
//             className="loginLogout"
//             onClick={() =>
//               window.open(
//                 "https://accounts.spotify.com/en/logout?",
//                 "_blank",
//                 "toolbar=yes,scrollbars=no,resizable=no,top=200,left=450,width=600,height=400"
//               )
//             }
//           >
//             Log Out
//           </a>
//         ) : (
//           <a href="http://localhost:8888/login" className="loginLogout">
//             Log In
//           </a>
//         )}
//         {this.props.user.user_id ? (
//           <img className="profileButton" src={this.state.profilePic} />
//         ) : null}
//         <div className="displayName">
//           {this.state.name != null ? (
//             <span>{this.state.name}</span>
//           ) : (
//             <span>{this.state.id}</span>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => state.userReducer;

// export default connect(
//   mapStateToProps,
//   { getUser }
// )(TopNavBar);
