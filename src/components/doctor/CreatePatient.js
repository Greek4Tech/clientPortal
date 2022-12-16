import React, { useState, useDispatch } from "react";
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

const CreatePatient = props => {
  const patientId = Math.floor(Math.random(10000))
  const patientString = localStorage.getItem("patient-" + patientId);
  const patient = JSON.parse(patientString);
  const [form] = Form.useForm();
  // This is a JavaScript function named onFinish that takes in a single parameter valuesToPass. The function uses the valuesToPass object to access and modify several properties, including date_of_birth and date_of_last_visit. It then calls the add_patient method with valuesToPass as an argument and uses the history object from the props parameter to navigate to a new page at the URL "/patientlist".
  const onFinish = valuesToPass => {
    valuesToPass.date_of_birth = valuesToPass.date_of_birth.format(
      "YYYY/MM/DD"
    );
    valuesToPass.date_of_last_visit = valuesToPass.date_of_last_visit.format(
      "YYYY/MM/DD"
    );
    valuesToPass.symptoms = fields;
    valuesToPass.medicines = meds;
    props.add_patient(valuesToPass);
    localStorage.setItem("patient-123", JSON.stringify(patient)); // save patient to local storage
    props.history.push("/patientlist");
  };
  

  const [fields, setFields] = useState([{ value: null }]);
  const [meds, setMeds] = useState([{ meds: null }]);
  const [gender, setGender] = useState("");

  console.log("fields first", fields);
  //several event handlers for handling user interactions with the form, such as adding or removing symptoms and medicines, and for submitting the form. 
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

const mapPropsToState = dispatch => {
  return {
    add_patient: data => {
      data.id = Math.random();
      dispatch({ type: "ADD_PATIENT", data: data });
    }
  };
};

export default connect(null, mapPropsToState)(CreatePatient);
