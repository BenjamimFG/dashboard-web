import { useEffect, useState } from 'react';
import './TableCapacitiesResults.css';

const capacities_indexes = [3, 4, 5, 6, 7, 8, 9];
const results_indexes = [11, 12, 13, 14, 15];

export default function TableCapacitiesResults({ data, labels, indexes }) {
  const [capacitiesData, setCapacitiesData] = useState([]);
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    if (data[0].length === 0 || data[1].length === 0) return;

    const newCapacitiesData = [];
    const newResultsData = [];

    for (const d of data[0]) {
      const sameIndexOnData1 = data[1].find(v => v.index_data_id === d.index_data_id);
      if (capacities_indexes.indexOf(d.index_data_id) !== -1) {
        newCapacitiesData.push({
          name: d.name,
          value: [d.value, sameIndexOnData1.value]
        });
      }
      else if (results_indexes.indexOf(d.index_data_id) !== -1) {
        newResultsData.push({
          name: d.name,
          value: [d.value, sameIndexOnData1.value]
        });
      }
    }

    setCapacitiesData(newCapacitiesData);
    setResultsData(newResultsData);
  }, [data])

  return (<>
    <table className="table-capacities-results">
      <thead>
        <tr>
          <th>Dimensão de Capacidades</th>
          <th colSpan={2}>Capacidades</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Indicador</th>
          <th>{labels[0]}</th>
          <th>{labels[1]}</th>
        </tr>
      </thead>
      <tbody>
        {capacitiesData.map((d, i) => {
          return <tr key={i}>
            <td>{d.name}</td>
            <td>{d.value[0]}</td>
            <td>{d.value[1]}</td>
          </tr>;
        })}
      </tbody>
    </table>
    <table className="table-capacities-results">
      <thead>
        <tr>
          <th>Dimensão de Resultados</th>
          <th colSpan={2}>Resultados</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Indicador</th>
          <th>{labels[0]}</th>
          <th>{labels[1]}</th>
        </tr>
      </thead>
      <tbody>
        {resultsData.map((d, i) => {
          return <tr key={i}>
            <td>{d.name}</td>
            <td>{d.value[0]}</td>
            <td>{d.value[1]}</td>
          </tr>;
        })}
      </tbody>
    </table>
  </>);
}