import React from "react";
import { connect } from "react-redux";
import { Card } from "antd";

const MyProfile = props => {
  const { patients } = props;
  return (
    <div className="container">
      <Card title={patients.name} style={{ width: 300 }}>
        <p>
          <strong>Age: </strong>
          {patients.age}
        </p>
        <p>
          <strong>Email: </strong>
          {patients.email}
        </p>
        <p>
          <strong>Gender: </strong>
          {patients.gender}
        </p>
        <p>
          <strong>DOB: </strong> {patients.date_of_birth}
        </p>
        <p>
          <strong>Last Visited: </strong>
          {patients.date_of_last_visit}
        </p>
        <p>
          <strong>Symptoms : </strong>
          {patients.symptoms.map(a => a.value).toString()}
        </p>
        <p>
          <strong>Medicines : </strong>
          {patients.medicines.map(a => a.meds).toString()}
        </p>
      </Card>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    patients: state.patients.patients.find(patient => patient.id === id)
  };
};

export default connect(mapStateToProps)(MyProfile);
