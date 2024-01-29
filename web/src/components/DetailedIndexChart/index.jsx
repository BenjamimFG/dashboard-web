import { useEffect, useState } from 'react';
import Radar from '../../libs/Radar';

import './DetailedIndexChart.css';

import CardIndex from '../CardIndex';

const INDEX_IDS_TO_SHOW_CARDS = [1, 2, 10];
const COLOR_MAP = { 1: '#00408d', 2: '#2f80ed', 10: '#00c4e1' };

export default function DetailedIndexChart({ data, title, indexStats, compare }) {
  const [cardsData, setCardsData] = useState([]);
  const [cardsData2, setCardsData2] = useState([]);
  const [radarChartAxisConfig, setRadarChartAxisConfig] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const filteredCardsData = data[0].filter(d => INDEX_IDS_TO_SHOW_CARDS.indexOf(d.index_data_id) !== -1);
    const filteredChartData = data[0].filter(d => INDEX_IDS_TO_SHOW_CARDS.indexOf(d.index_data_id) === -1);

    const newChartData = { name: 'Selecionado' };

    for (const d of filteredChartData) {
      newChartData[d.name] = d.value;
    }

    if (!compare) {
      const maxData = { name: 'Maior Valor' };
      const avgData = { name: 'Média' };

      const filteredStats = indexStats.filter(d => INDEX_IDS_TO_SHOW_CARDS.indexOf(d.index_data_id) === -1);

      for (const d of filteredStats) {
        maxData[d.name] = Number.parseFloat(d.max);
        avgData[d.name] = Number.parseFloat(d.avg);
      }

      const arr = [newChartData, maxData, avgData];
      setChartData(arr);
    }
    else {
      newChartData['name'] = title[0];

      const filteredCardsData2 = data[1].filter(d => INDEX_IDS_TO_SHOW_CARDS.indexOf(d.index_data_id) !== -1);
      const filteredChartData2 = data[1].filter(d => INDEX_IDS_TO_SHOW_CARDS.indexOf(d.index_data_id) === -1);

      const newChartData2 = { name: title[1] };

      for (const d of filteredChartData2) {
        newChartData2[d.name] = d.value;
      }

      const arr = [newChartData, newChartData2];
      setChartData(arr);

      const newCards2 = filteredCardsData2.map(d => {
        return {
          label: d.name,
          value: d.value,
          rank: d.rank.toString(),
          color: COLOR_MAP[d.index_data_id]
        }
      });

      setCardsData2(newCards2);
    }

    const newCards = filteredCardsData.map(d => {
      return {
        label: d.name,
        value: d.value,
        rank: d.rank.toString(),
        color: COLOR_MAP[d.index_data_id]
      }
    });

    setCardsData(newCards);

    const newAxisConfig = filteredChartData.map(d => {
      return {
        name: d.name,
        max: 1
      };
    });

    setRadarChartAxisConfig(newAxisConfig);
  }, [data, indexStats, compare]);

  return <div className='detailed-index-card'>
    <h2 className='detailed-index-title'>{title[0]}</h2>
    <div className='detailed-cards card-grid'>
      {cardsData.map((d, i) => {
        return <CardIndex key={i} label={d.label} color={d.color} value={d.value} rank={d.rank} />
      })}
    </div>
    {compare ? <>
      <h2 className='detailed-index-title'>{title[1]}</h2>
      <div className='detailed-cards card-grid'>
        {cardsData2.map((d, i) => {
          return <CardIndex key={i} label={d.label} color={d.color} value={d.value} rank={d.rank} />
        })}
      </div>
    </> : <></>}
    <div className="detailed-index-chart">
      <Radar
        data={chartData}
        width={700}
        height={400}
        axisConfig={radarChartAxisConfig}
      />
    </div>
  </div>
}