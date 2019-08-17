import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class BikeView extends Component {
  render() {
    const { bike } = this.props;
    if (bike) {
      return (
        <div>
          <div className="container valign-wrapper">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">
                    <h2>{bike.bikeName}</h2>
                  </span>
                  <p>{bike.photoURL}</p>
                </div>
                <div className="card-action">
                  <h4>Description</h4>
                  <p>{bike.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  //id = the document id of the project
  const id = ownProps.match.params.id;
  const bikes = state.firestore.data.bikes;
  const bike = bikes ? bikes[id] : null;

  //DUMMY DADA TESTING:
  // const bikes = state.bike.bikes;
  // const bike = bikes ? bikes.find(x => x.id === id) : null;
  // console.log("We are looking at this bike:", bike);
  return {
    bike: bike,
    // auth: state.firebase.auth,
    docId: id
  };
};

export default compose(
  connect(
    mapStateToProps
    // mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "bikes"
    }
  ])
)(BikeView);