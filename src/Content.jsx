import axios from "axios";
import { useState, useEffect } from "react";
import { PatientsIndex } from "./PatientsIndex";
import { PatientsNew } from "./PatientsNew";
import { PatientsShow } from "./PatientsShow";
import { Modal } from "./Modal";

export function Content() {
  const [patients, setPatients] = useState([]);
  const [isPatientsShowVisible, setIsPatientsShowVisible] = useState(false);
           //state variable, fx used to update variable, initializes default value of false
  const [currentPatient, setCurrentPatient] = useState ({});
      //declaring variable, fx to update    inititialzing with empty object
     

  const handleIndexPatients = () => {
    console.log("handleIndexPatients");               
    axios.get("http://localhost:3000/patients.json").then((response) => {
    //HTTP get request to fetch data from specific URL
      console.log(response.data); //logs data received from the API for degugging
      setPatients(response.data); //calls SetPatients fx to update the state variable patients with the data recieved from the API
    });
  };
//.then is a method that takes a fx as an argument and runs that function if the axios.get request is successful. (response) => {...} is an arrow function that takes repsonse as a parameter (response contains the data from the api)
//response result of HTTP request
//const HandleIndexPatients is a fx that fetches data from an API and updates the state with that data
  const handleCreatePatient = (params, successCallback) => {
    console.log("handleCreatePatient", params); //params is sending the new patient's info to the server
    axios.post("http://localhost:3000/patients.json", params).then((response) => {
    setPatients([...patients, response.data]);
    successCallback();//after updating state, this fx is called and allows you to continue to run code after patient successfully created
    });
  };
//params data sending to the server when creating a new patient
//successCallBack fx called when patient is successfully created
//SetPatients is called and takes the existing patients array and adds the new patient (r.d.) to it
                         //paramerter, patient to be shown
  const handleShowPatient = (patient) => {
    console.log("handleShowPatient", patient);
    setIsPatientsShowVisible(true); //calls state setting fx to set state variable to true displaying patient
    setCurrentPatient(patient); //the other state setter that updates CurrentPatient with the patient parameter passed to the fx thus updating the current patient to be displayed
  };

              //id of patient to be updated, params: obj containing the new data for the patient, fx to be called when the update is successful
    const handleUpdatePatient = (id, params, successCallback) => {
      console.log("handleUpdatePatient", params); //logs params to see what data is being sent to the server
      axios.patch(`http://localhost:3000/patients/${id}.json`, params).then((response) => {
        setPatients(  //updates the patients state with the new data
        patients.map((patient) => { //iterates over current list of patients
          if (patient.id === response.data.id) { //checks if patient's id matches id of the updated patient returned by the server
            return response.data; //if true returns response.data
          } else {
            return patient; //if false returns the existing patient data unchanged
          }
        })
      );
      successCallback(); //calls this fx to perform any additional actions needed after the patient is successfully updated
      handleClose(); //calls this function to close the modal or hide the patient details after the update it complete
    });
  };
  //axios.patch sends HTTP PATCH request to the server to update to update the patient's data
  //URL is the endpoint where the patient's data will be updated (for a given patient's id) and params is the data to be updated on the server
  //response: response from the server after the PATCH request is completed


  const handleClose = () => {
    console.log("handleClose");
    setIsPatientsShowVisible(false); //calls function and closes patient display
  };
   //fx called handleDestroyPatient using arrow fx syntax (single parameter id, which is the identifier of the patient)
  const handleDestroyPatient = (id) => {
    console.log("handleDestroyPatient", id);//logs string and value of id
    axios.delete(`http://localhost:3000/patients/${id}.json`).then((response) => {
      setPatients(patients.filter((patient) => patient.id !== id)); 
      handleClose(); //closes modal
    });
  };
// axios.delete is used to send an HTTP DELETE request to the server
// URL is constructed dynamically using the id parameter
// The .then((response) => { ... }) part is a promise. When the server responds to the DELETE request, the .then method is executed with the response object
// next line updates the state of the patients list
// patients.filter((patient) => patient.id !== id) creates a new array that includes all patients except the one with the matching id. The filter method loops through each patient and includes only those patients whose id is not equal to the given id.
// setPatients is a state updater fx (likely from useState hook) that updates the state with this new filtered array of patients.


  useEffect(handleIndexPatients, []);

  return (
    <main>
      <PatientsNew onCreatePatient={handleCreatePatient} />
      <PatientsIndex patients={patients} onShowPatient={handleShowPatient} />
      <Modal show={isPatientsShowVisible} onClose={handleClose}> 
        <PatientsShow patient={currentPatient} onUpdatePatient={handleUpdatePatient} onDestroyPatient={handleDestroyPatient}/>
      </Modal>
    </main>
  )
}
// Modal component given to a prop called show with the value of true
// <h1>Test</h1> this is the children prop