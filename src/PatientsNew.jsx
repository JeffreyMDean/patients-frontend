export function PatientsNew(props) {
  
  const handleSubmit = (event) => {
    event.preventDefault();//stops default action(nno page refresh after form submission)
    const params = new FormData(event.target);
    props.onCreatePatient(params, () => event.target.reset());
  }; //really handleCreatePatient, params collected form data, e.t.r. will reset the form after props.OnCreatePatient completes

  return (
    <div>
      <h1>New Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Age: <input name="age" type="text" />
        </div>
        <div>
          Insurance: <input name="insruance" type="text" />
        </div>
        <button type="submit">Create patient</button>
      </form>
    </div>
  );
}