export function PatientsIndex(props) {
  return (
    <div>
      <h1>All patients</h1>
      {props.patients.map((patient) => ( 
        <div key={patient.id}>
          <p>{patient.name}</p>
          <p>{patient.age}</p>
          <p>{patient.insurance}</p>
          <button onClick={() => props.onShowPatient(patient)}>More info</button>
        </div>
      ))}
    </div>
  );
}
// onCLick is the event handler for when button is clicked
// props.onShowPatient(patient) calling the onShowPatient fx that was to the component as a prop to likely display more info about the patient and the patient variable is likely the patient data that corresponds to this button