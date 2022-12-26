import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Row,
  Col
} from "antd";

const { Search } = Input;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!"
  },
  number: {
    range: "Must be between"
  }
};
const dateFormat = "YYYY/MM/DD";


// This code defines a React functional component called `CreatePatient` that has a form for creating a patient record. The component has several state variables and event handlers for managing the form fields and for adding and removing symptoms and medications.
// `const CreatePatient = props => {` This line defines a functional component called `CreatePatient` that takes a single argument called `props`
const CreatePatient = props => {
  // The line below uses `useForm` hook from the `antd` library to create a form instance and assigns it the `form` variable. This hook allows us to create and manage forms in our React components.
  const [form] = Form.useForm();
  // This line defines an event handsler called `onFinish` that will be called when the form is succesfully submitted. It takes a single argument `valuesToPass` object to have a specific format.
  const onFinish = valuesToPass => {
    // valuesToPass.date_of_birth = valuesToPass.date_of_birth.format("YYYY/MM/DD");This line formats the date_of_birth field of the valuesToPass object to have a specific format.
    valuesToPass.date_of_birth = valuesToPass.date_of_birth.format(
      "YYYY/MM/DD"
    );
    // valuesToPass.date_of_last_visit = valuesToPass.date_of_last_visit.format("YYYY/MM/DD");This line formats the date_of_last_visit field of the valuesToPass object to have a specific format.
    valuesToPass.date_of_last_visit = valuesToPass.date_of_last_visit.format(
      "YYYY/MM/DD"
    );
    // This line sets the `symptoms` field of the `valuesToPass` object to the current value of the `fields` state variable. The `fields` state variable is an array of objects that represent the symptoms entered by the user in the form. Each object has a `value` property that contains the value of the symptom. e.g.: [  { value: "headache" },  { value: "fever" },  { value: "cough" }]. Then the `symptoms field of the `valuesToPass` object will be set to this array. The `valuesToPass` object is passed to the `add_patient` function from the `props` object as an argument. This function is likely used to dispatch an action to add a patient to the application's state, and the `symptoms` field of `valuesToPass` object will be used to store the symptoms of the patient in the applications's state.
    valuesToPass.symptoms = fields;
    // This line sets the medicines field of the valuesToPass object to the current value of the meds state variable.
    valuesToPass.medicines = meds;
    // This line calls the `add_patient` function from the `props` object with the `valuesToPass` object as an argument. The `add_patient` function is used to dispatch an action to add a patient to the application's state. The `valuesToPass` object contains the value of the form fields, including the patient's name, email, gender, symptoms and medications. The `add_patient` function is passed to `CreatePatient` component as a prop, and it is defined in the parent component, in App.js
    props.add_patient(valuesToPass);
    // This line uses `push` method of the `history` object from the `props` object to navigate to the `/patientlist` route. The `history` object is part of the `react-router-dom` library and it is used to manage the browser's history and navigates to the specified route. In this case, the `/patientlist` route is being navigated to after the patient has been added to the application's state. This route displays a list of patients in the application. 
    props.history.push("/patientlist");
  };

  const [fields, setFields] = useState([{ value: null }]);
  const [meds, setMeds] = useState([{ meds: null }]);
  const [gender, setGender] = useState("");

  console.log("fields first", fields);

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  function handleMedChange(i, event) {
    const values = [...meds];
    values[i].meds = event.target.value;
    setMeds(values);
    console.log("fields", fields);
  }

  function handleMedAdd() {
    const values = [...meds];
    values.push({ meds: null });
    setMeds(values);
  }

  function handleMedRemove(i) {
    const values = [...meds];
    values.splice(i, 1);
    setMeds(values);
  }

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }]
  };
  return (
    <Col span={12} offset={6}>
      <h1>Create Patient</h1>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99
            }
          ]}
        >
          <InputNumber />
        </Form.Item>

        {/* write-in gender as a string */}
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Input value={gender} onChange={handleGender} />
        </Form.Item>

        {/* Drop down menu to select gender, more genders must be added */}
        {/* <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item> */}

        <Form.Item name="symptoms" label="Symptoms">
          <Button
            type="primary"
            style={{ margin: "0px 0px 20px 5px" }}
            onClick={() => handleAdd()}
            shape="circle"
          >
            +
          </Button>
          {fields.map((field, idx) => {
            return (
              <Form.Item>
                <div key={`${field}-${idx}`}>
                  <Search
                    onChange={e => handleChange(idx, e)}
                    onSearch={() => handleRemove(idx)}
                    enterButton="X"
                    style={{ width: 200 }}
                  />
                </div>
              </Form.Item>
            );
          })}
        </Form.Item>
        <Form.Item name="medicines" label="Medicines">
          <Button
            type="primary"
            style={{ margin: "0px 0px 20px 5px" }}
            onClick={() => handleMedAdd()}
            shape="circle"
          >
            +
          </Button>

          {meds.map((field, idx) => {
            return (
              <Form.Item>
                <div key={`${field}-${idx}`}>
                  <Search
                    onChange={e => handleMedChange(idx, e)}
                    onSearch={() => handleMedRemove(idx)}
                    enterButton="X"
                    style={{ width: 200 }}
                  />
                </div>
              </Form.Item>
            );
          })}
        </Form.Item>
        <Form.Item name="date_of_birth" label="Date of Birth" {...config}>
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="date_of_last_visit" label="Last Visited" {...config}>
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

// This code defines a function called `mapPropstoState` that takes a single argument `dispatch`.`mapPropstoState` returns an object with a single key-value pair. The key is: `add_patient` and the value is a function that takes a single argument: `data`
const mapPropsToState = dispatch => {
  return {
    // the action has a type of `ADD_PATIENT` and a payload of `data`. The reducer function might handle this action by adding the patient data to a list of patients in the store. 
    add_patient: data => {
      // A property called `id` is added to the `data` object, and the value of this property is set to a random number. 
      data.id = Math.random();
      // Then, the `dispatch` function is called with an object as an arguement. It has two properties: `type: "ADD_PATIENT"`, and `data`, which has the value of `data` argument passed to the outer function.
      // The `dispatch` function is used to dispatch actions to the store, and the returned object allows the component using `mapPropsToState` to call the `add_patient` function and dispatch an action with the appropriate type and payload to the store. 
      dispatch({ type: "ADD_PATIENT", data: data });
    }
  };
};

export default connect(null, mapPropsToState)(CreatePatient);
