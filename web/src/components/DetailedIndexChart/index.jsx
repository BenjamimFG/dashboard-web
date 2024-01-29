import { useEffect, useState } from 'react';
import Radar from '../../libs/Radar';

import './DetailedIndexChart.css';

import CardIndex from '../CardIndex';

const INDEX_IDS_TO_SHOW_CARDS = [1, 2, 10];
const COLOR_MAP = { 1: '#00408d', 2: '#2f80ed', 10: '#00c4e1' };

export default function DetailedIndexChart({ data, title, indexStats }) {
  const [cardsData, setCardsData] = useState([]);
  const [radarChartAxisConfig, setRadarChartAxisConfig] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const filteredCardsData = [];
    const filteredChartData = [];

    for (const d of data) {
      if (INDEX_IDS_TO_SHOW_CARDS.indexOf(d.index_data_id) === -1) {
        filteredChartData.push(d);
      }
      else {
        filteredCardsData.push(d);
      }
    }

    const newChartData = { name: 'Selecionado' };

    for (const d of filteredChartData) {
      newChartData[d.name] = d.value;
    }

    const maxData = { name: 'Maior Valor' };
    const avgData = { name: 'Média' };

    const filteredStats = indexStats.filter(d => INDEX_IDS_TO_SHOW_CARDS.indexOf(d.index_data_id) === -1);

    for (const d of filteredStats) {
      maxData[d.name] = Number.parseFloat(d.max);
      avgData[d.name] = Number.parseFloat(d.avg);
    }

    const arr = [newChartData, maxData, avgData];
    setChartData(arr);

    const newAxisConfig = filteredChartData.map(d => {
      return {
        name: d.name,
        max: 1
      };
    });

    setRadarChartAxisConfig(newAxisConfig);

    const newCards = filteredCardsData.map(d => {
      return {
        label: d.name,
        value: d.value,
        rank: d.rank.toString(),
        color: COLOR_MAP[d.index_data_id]
      }
    });

    setCardsData(newCards);
  }, [data, indexStats]);

  return <div className='detailed-index-card'>
    <h2 className='detailed-index-title'>{title}</h2>
    <div className='detailed-cards card-grid'>
      {cardsData.map((d, i) => {
        return <CardIndex key={i} label={d.label} color={d.color} value={d.value} rank={d.rank} />
      })}
    </div>
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