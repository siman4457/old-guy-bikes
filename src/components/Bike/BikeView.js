import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class BikeView extends Component {
  render() {
    const { bike } = this.props;
    if (bike) {
      return (
        <div className="container">
          <h2 className="black-text">{bike.bikeName}</h2>

          <img
            className="rounded-corners responsive-img"
            src={bike.photoURL}
            alt="error"
          />
          <h4 className="text-center">${bike.price}</h4>

          <div className="black-text">
            <h4>Description</h4>
            <p className="include-line-break black-text">{bike.description}</p>
          </div>
          <div>
            <a className="contact-button btn-large z-depth-0" href="./contact">
              Contact
            </a>
          </div>
          <br />
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
  const id = ownProps.match.params.id;
  const bikes = state.firestore.data.bikes;
  const bike = bikes ? bikes[id] : null;

  return {
    bike: bike,
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
