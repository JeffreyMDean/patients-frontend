import "./Modal.css";
// defines a React functional component 'Modal'
//props is an object that contains all the data and functions that are passed to the component from its paretn component (expectin 2 props show and onClose)
export function Modal(props) {
  if (props.show) {  //if true return jsx, if false modal will not be displayed
    return(
      <div className="modal-background">
        <section className="modal-main">
          {props.children} 
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;                                  
          </button>
        </section>
      </div>
    );
  }
}

// show is a boolean the determines whether the modal should be displayed
// onClose is a fx to be called when the modal's close button is clicked
// {props.children} this special placeholder inserts whatever elements or components are passed between the opening and closing tag of the modal component when it is used...so I think props.children would be replaced with Test in the upcoming modal stuff I will implement
// when button is clicked the fx passed to onCLose will be executed