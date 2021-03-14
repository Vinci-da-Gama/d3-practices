import { useState, memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Chart5Container = styled.div`
  .add-children-form {
    display: flex;
    justify-content: space-between;
  }
`;

const initChild = {
  name: "",
  height: "",
  age: "",
};

const S5Table = memo(({ chartData, setChartData, selectedName }) => {
  const [child, setChild] = useState(initChild);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChild({
      ...child,
      [name]: value,
    });
  };

  const addChild = () => {
    setChartData([...chartData, child]);
    setChild(initChild);
  };

  const handleRemove = (e) => {
    const { name } = e.target;
    setChartData(chartData.filter((el) => el.name !== name));
  };

  const renderTable = () =>
    chartData.map((el, idx) => (
      <tr
        key={`${el.name}_${idx}`}
        style={{
          backgroundColor: `${el.name === selectedName ? "orange" : ""}`,
        }}
      >
        <td>{el.name}</td>
        <td>{el.height}</td>
        <td>{el.age}</td>
        <td>
          <button
            type="button"
            style={{ width: "100%" }}
            name={el.name}
            onClick={handleRemove}
          >
            Remove
          </button>
        </td>
      </tr>
    ));

  return (
    <Chart5Container>
      <div className="add-children-form">
        <input
          type="text"
          name="name"
          placeholder={"Name..."}
          value={child.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="height"
          placeholder={"Height..."}
          value={child.height}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder={"Age..."}
          value={child.age}
          onChange={handleChange}
        />
        <button type="button" onClick={addChild}>
          Add
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {Object.keys(chartData[0]).map((el, idx) => (
              <th key={`${el}_${idx}`}>{el}</th>
            ))}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </Chart5Container>
  );
});

S5Table.propTypes = {
  chartData: PropTypes.array.isRequired,
  setChartData: PropTypes.func.isRequired,
  selectedName: PropTypes.string.isRequired,
};

export default S5Table;
