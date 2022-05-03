import React, { useEffect } from "react";
import { connect } from "react-redux";
import DoctorAppointments from "../components/Dashboard/DoctorAppointments";
import DoctorDashboard from "../components/Dashboard/DoctorDashboard";
import PatientAppointments from "../components/Dashboard/PatientAppointments";
import PatientDashboard from "../components/Dashboard/PatientDashboard";
import MetaComponent from "../components/Meta/MetaComponent";
import metaData from "../seeds/metaData";
import { getBookings } from "../redux/actions/booking";
import Preloader from "../components/Preloader/Preloader";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";

const AppointmentContainer = ({ loading, user, appointments, getBookings }) => {
  useEffect(() => {
    getBookings();
  }, [getBookings]);

  console.log(appointments);
  return (
    <>
      <MetaComponent
        title={metaData.home.title}
        description={metaData.home.description}
        keywords={metaData.home.keywords}
      />
      <div className="container container--bg">
        {loading || user == null ? (
          <Preloader />
        ) : (
          <div class="dashboard">
            <div className="dashboard__navbar">
              <DashboardNavbar
                links={[
                  ["Doctors", "/dashboard"],
                  ["Appointments", "/appointments"],
                ]}
              />
            </div>
            {user && user.userType === "doctor" ? (
              <DoctorAppointments />
            ) : (
              <PatientAppointments />
            )}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user || null,
  loading: state.auth.loading,
  appointments: state.bookings.appointments,
});

export default connect(mapStateToProps, { getBookings })(AppointmentContainer);
