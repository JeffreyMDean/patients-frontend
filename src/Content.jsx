import axios from "axios";
import { useState, useEffect } from "react";
import { PatientsIndex } from "./PatientsIndex";
import { PatientsNew } from "./PatientsNew";
import { Modal } from "./Modal";

export function Content() {
  const [patients, setPatients] = useState([]);
  const [isPatientsShowVisible, setIsPatientsShowVisible] = useState(false);
           //state variable, fx used to update variable, initializes default value of false
  const [currentPatient, setCurrentPatient] = useState ({});
      //declaring variable, fx to updat    inititialzinz with empty object
     

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
    console.log("handleCreatePatient", params); //params is sendding the new patient's info to the server
    axios.post("http://localhost:3000/patients.json", params).then((response) => {
    setPatients([...patients, response.data]);
    successCallback();//after updating state, this fx is called and allows you to continue to run code after patient successfully created
    });
  };
//params data sending to the server when creating a new patient
//successCallBack fx called when patient is successfully created
//SetPatients is called and takes the existing patients array and adds the new patient (r.d.) to it
                         //paramerter, photo to be shown
  const handleShowPatient = (patient) => {
    console.log("handleShowPatient", patient);
    setIsPatientsShowVisible(true); //calls state setting fx to set state variable to true displaying patient
    setCurrentPatient(patient); //the other state setter that updates CurrentPatient with the patient parameter passed to the fx thus updating the current patient to be displayed
  };
                     //arrow fx syntax used to define fx
  const handleClose = () => {
    console.log("handleClose");
    setIsPatientsShowVisible(false); //calls function and closes patient display
  };

  useEffect(handleIndexPatients, []);


  return (
    <main>
      <PatientsNew onCreatePatient={handleCreatePatient} />
      <PatientsIndex patients={patients} onShowPatient={handleShowPatient} />
      <Modal show={isPatientsShowVisible} onClose={handleClose}> 
        <h1>Test</h1> 
      </Modal>
    </main>
  )
}
// Modal component given to a prop called show with the value of ture
// <h1>Test</h1> this is the children prop