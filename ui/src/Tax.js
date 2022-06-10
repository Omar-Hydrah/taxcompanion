import { useState } from "react";
import axios from "axios";
import "./Tax.css";
function Tax() {
  const [country, setCountry] = useState();
  const [salary, setSalary] = useState();
  const [tax, setTax] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/taxes?country=${country}&salary=${salary}`)
      .then((response) => {
        setTax(response.data);
      });
  };
  return (
    <div className="tax">
      <h2>Find out how much the government loves you!</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label id="country-input">
          Country:
          <input
            type="text"
            name="country"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label id="salary-input">
          Salary:&nbsp;
          <input
            type="text"
            name="salary"
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </label>
        <button>Find out</button>
      </form>
      <div id="response">
        <h2>{tax}</h2>
      </div>
    </div>
  );
}

export default Tax;
