import React, { useState, useEffect } from "react";

function Table({ txns }) {
  const [data, setData] = useState([]);
  const [selectDate, setSelectDate] = useState("");

  useEffect(() => {
    const buildData = () => {
      setData(txns);
    };

    buildData();
  }, [txns, data, selectDate]);

  const sortAmount = () => {
    setData([...txns.sort((a, b) => (a.amount > b.amount ? 1 : -1))]);
  };

  const handleChange = (e) => {
    setSelectDate(e.target.value);
  };

  return (
    <div>
      <section>
        <label>Transaction Date</label>
        <input
          id="date"
          type="date"
          value={selectDate}
          onChange={handleChange}
        />
        <button className="small">Filter</button>
      </section>

      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>
                <span id="amount" onClick={sortAmount}>
                  Amount ($)
                </span>
              </th>
              <th>Available Balance</th>
            </tr>
          </thead>
          {/* The issues I had initally submitted included calling "type" as an object and not a variable & trying to do the filter in a separate function call */}
          {data
            .filter((item) => item.date.includes(selectDate))
            .map(({ date, description, type, amount, balance }, index) => (
              <tbody key={index}>
                <tr>
                  <td>{date}</td>
                  <td>{description}</td>
                  <td>{type === 1 ? "Debit" : "Credit"}</td>
                  <td>{amount}</td>
                  <td>{balance}</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}

export default Table;
