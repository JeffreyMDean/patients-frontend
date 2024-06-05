export function PatientsNew() {
  return (
    <div>
      <h1>New Patient</h1>
      <form>
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