import PropTypes from "prop-types";
// import styled from "styled-components";

/* const Chart5Container = styled.div`
  .add-children-form {
    display: flex;
    justify-content: space-between;
  }
`; */

const S5Table = ({ chartData }) => {
  if (!chartData) {
    return <div>no children data...</div>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            {Object.keys(chartData[0]).map((el, idx) => (
              <th key={`${el}_${idx}`}>{el}</th>
            ))}
          </tr>
        </thead>
        {/* <tbody>
        <tr></tr>
      </tbody> */}
      </table>
    </>
  );
};

S5Table.propTypes = {
  chartData: PropTypes.array,
};

export default S5Table;
