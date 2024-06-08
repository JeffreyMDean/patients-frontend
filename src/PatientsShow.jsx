export function PatientsShow(props) {
            //event parameter rep the event obj that is passed to the fx when form submitted
  const handleSubmit = (event) => {
    event.preventDefault();  //stops browser's default behavior which is reloading the page
    const params = new FormData(event.target); //collects all form data into a FormData object
    props.onUpdatePatient(props.patient.id, params, () => event.target.reset());
  };                     //id of patient that needs to be updated, params contains the form data
  // new FormData(event.target) creates a new FormData object from the form that triggered the event (accessible via event.target). The FormData object contains all the data from the form fields, which can be easily accessed and manipulated.
  // () => event.target.reset()); callback fx that resets the form after patient has been update, clearing all the fields in the form

  const handleClick = () => {
    props.onDestroyPatient(props.patient.id);
  };

  return (
    <div>
      <h1>Patient information</h1>
      <p>Name: {props.patient.name}</p>
      <p>Age: {props.patient.age}</p>
      <p>Insurance: {props.patient.insurance}</p>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={props.patient.name} name="name" type="text" />
        </div>
        <div>
          Age: <input defaultValue={props.patient.age} name="age" type="text" />
        </div>
        <div>
          Insurance: <input defaultValue={props.patient.insurance} name="insurance" type="text" />
        </div>
        <button type="submit">Update patient</button>
      </form>
      <button onClick={handleClick}>Destroy patient</button>
    </div>
  );
}

//props.patient is the equivalent of currentPatient
// placeholders for dynamic content. Accessing the name, age, and insurance properties of the pateint object passed through 'props'....so accessing name property of currentPatient
// Text field labeled Name. The input element creates a text input field where user can type their name. The defaultValue attribute is set to {props.patient.name} which means the defualt value of this input field will be whatever is stored in props.patient.name
// the 'name' attribute is set to "name" which is used to identify this input field in the form data when it's submitted. 
// last line creates a submit button for the form. When clicked, it will dubmit the form data to the server. The text on the button is "Update patient"
