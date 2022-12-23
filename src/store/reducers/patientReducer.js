const initState = {
  patients: [
  ]
};

// patientReducer that is responsible for updating the state of a !Redux store! in response to actions dispatched to the store.
// patientReducer function takes in two arguments: 
  // state: This is the current state of the Redux store. Initial value is initState as a default argument, which means that if no state is provided, the initial state will be initState
  // action: This is the object that represents an action dispatched to the store. It has a type property that specifies the type of action being dispatched, and may also have a data property that contains additional data relevant to the action (e.g. line 14 patients: "...action.data"")
const patientReducer = (state = initState, action) => {
  // the patientReducer function uses a switch statement to determine what action is being dispatched, and updates the state of the store accordingly** 
  switch (action.type) {
    
    
    // Explanation of "ADD_PATIENT"
    // this action (i.e. action.type === "ADD_PATIENT") adds a new patient to the list of patients stored in the state. The new patient is provided in action.data property
    case "ADD_PATIENT":
      // this line --Object.assign({}, state, {-- uses the Object.assign method to create a new object --first argument ({})-- that is a copy of the state object, with additional properties added, or modified. The new object is then returned by the reducer function.
      return Object.assign({}, state, {
        // this line adds a new property called patients to the new object being created by Object.assign(). The value of patients property is an array that contains all the elements of the `state.patients` array, with the new patient data provided by action.data appended to the end of the array. The `...` operator is a spread operator, and it allows the elements of the `state.patients` array to be spread out into a new array. This is done to create a new array rather than modidying the existing `state.patients` array, which would violate the principle of immutability in Redux. 
        patients: [...state.patients, action.data]
      });
            // In summary, this code block adds a new patient to the list of patients stored in the state by creating a copy of the `state` object with a new `patients` property that contains all the existing patient data plus the new patient data provided in the `action.data`. The updated state is then returned by the reducer function
    
    
      // this action (i.e. action.type === "EDIT_PATIENT") updates the information for an existing patient in the list of patients. The updated patient information is provided in the action.data property
      // this line specifies that the following code block should be executed if the `action.type` property of the `action` object passed to the reducer is equal to the "EDIT_PATIENT". This means that this code block will be executed when an "EDIT_PATIENT" action is dispatched to the store.
      case "EDIT_PATIENT":
        // `let newPatients = state.patients.map(patients =>`: This line, declares a new variable, `newPatients` and initializes it with the result of calling the `map()` method on `state.patients` array. The .map() method creates a new array by calling a provided function on each element in the array. In this case, the provided function is an an arrow function that takes in a single argument `patients`.
      let newPatients = state.patients.map(patients =>
        // `action.data.email === patients.email ? action.data : patients`: This is an arrow function that is called on each element in the `state.patients` array. It uses the ternary operator to return either the `action.data` object, or the current `patients` element, depending on whether the `email` property of `action.data` is equal to `email` property of `patients`. If the `email` properties are equal, it means that the current `patients` element represents the patient that is being edited, so the updated patient data in `action.data` is returned. If the `email` properties are not equal, it means that the current `patients` element represents a different patient, so the original `patients` element is returned. 
        action.data.email === patients.email ? action.data : patients
      );
      // return { ...state, patients: newPatients }: This line returns a !new object! that is a copy of the `state` object, with the `patients` property set to the `newPatients` array. The `...` operator is used to create a new object rather than modidying the existing `state` object, which would violate the principle of immutability in Redux.
      return {
        ...state,
        patients: newPatients
      };
            // In summary: This code block updates the information for an existing patient in the list of patients by creating a new array called `newPatients` that contains updated patient information for the patient being edited and the original patient information for all other patients. The updated state is then returned by the reducer function, with the `patients` property set to the `newPatients` array. 


      // this action (i.e. action.type === "DELETE_PATIENT") removes a patient from the list of paients. The email of the patient to be removed is provided in the action.data property


    // this block of code will be executed if the value of the `action.type` property is "DELETE_PATIENT"
    case "DELETE_PATIENT":
      // Declare a new variable `newState` that will hold the filtered list of patients
      let newState = state.patients.filter(patient => {
        // this is an arrow function that will be called for each element in the `state.patients` array
        // the `patient` parameter represents the current element being processed

        // return `true` if the patient's email does not match the value of `action.data`, and `false` otherwise
        return patient.email !== action.data;
      });
      // Return a new object that has the same properties as the original `state` object,
      // except with the `patiens` property set to the filtered list stored in `newState`
      return {
        ...state,
        patients: newState
      };
      // this action (i.e. action.type === "UPSERT") updates an existing patient in the list of patient if one exists with the same email, or adds a new patient to the list if no patient with the same email exists. The patient information is provided in the action.data property. 


    // This block of code will be executed if the value of the `action.type` property is "UPSERT"  
    // UPSET = Update and Insert - An upsert is a database operation that will update an existing row if a specified value already exists in a table, and insert a new row if specified value doesn't already exist
    case "UPSERT": { 
      // Create a new array called `newPatients` that is a copy of the `state.patients` array
      const newPatients = [...state.patients]

      // Find the patient in the `state.patients` array whose email matches the email in the `action.data` object. In this code `action.data` is an object that contains data related to the action being performed.
      const existingPatient = state.patients.find(patient => patient.email === action.data.email) 

      // if existingPatient were found, update it's properties with the values from the `action.data` object
      if (existingPatient) {
        // In this case, `Object.assign()` method is used to copy the properties and their values from the `action.data` object into the `existingPatient` object. This effectively updates the `existingPatient` object with the new data contained in teh `action.data`
        Object.assign(existingPatient, action.data)
        // If no existing patient was found, push the `action.data` object onto the `newPatients` array
      }else{
        newPatients.push(action.data)  
      }
        // Return a new object that has the same properties as the original `state` object, except with the `patients` property set to the updated `newPatients` array  
      return {
        ...state,
        patients: newPatients
      };
      }
      default:
      return state;
  };
};

export default patientReducer;


// ** In Redux application, the state of the application is stored in a single, immutable data structure called the store. The store is a plain JS object that holds the current state of the application, and the only way to change the state of the store is to dispatch an action to it. 

// General info: A reducer is a function that takes in the current state of the store and an action, and returns a new, updated state based on the action. The reducer is responsible for specifying how the state of the store should be updated in response to actions dispatched to the store. 