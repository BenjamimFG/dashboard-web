import { useEffect, useState } from 'react';

import './DetailedIndexChart.css';
import CardIndex from '../CardIndex';

const INDEX_IDS_TO_SHOW_CARDS = [1, 2, 10];
const COLOR_MAP = { 1: '#00408d', 2: '#2f80ed', 10: '#00c4e1' };

export default function DetailedIndexChart({ data, title }) {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const newCards = data
      .filter(d => INDEX_IDS_TO_SHOW_CARDS.indexOf(d.index_data_id) !== -1)
      .map(d => {
        return {
          label: d.name,
          value: d.value,
          rank: d.rank.toString(),
          color: COLOR_MAP[d.index_data_id]
        }
      });

    setCardsData(newCards);
  }, [data]);

  return <div className='detailed-index-card'>
    <h2 className='detailed-index-title'>{title}</h2>
    <div className='detailed-cards card-grid'>
      {cardsData.map((d, i) => {
        return <CardIndex key={i} label={d.label} color={d.color} value={d.value} rank={d.rank} />
      })}
    </div>
    <div className="detailed-index-chart">
      chart here
    </div>
  </div>
}