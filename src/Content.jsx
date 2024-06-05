import axios from "axios";
import { useState, useEffect } from "react";
import { PatientsIndex } from "./PatientsIndex";
import { PatientsNew } from "./PatientsNew";

export function Content() {
  const [patients, setPatients] = useState([]);

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

  useEffect(handleIndexPatients, []);


  return (
    <main>
      <PatientsNew onCreatePatient={handleCreatePatient} />
      <PatientsIndex patients={patients} />
    </main>
  )
}