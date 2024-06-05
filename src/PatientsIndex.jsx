export function PatientsIndex(props) {
  return (
    <div>
      <h1>All patients</h1>
      {props.patients.map((patient) => ( 
        <div key={patient.id}>
          <p>{patient.name}</p>
          <p>{patient.age}</p>
          <p>{patient.insurance}</p>
        </div>
      ))}
    </div>
  );
}