import QueryStatsOutlined from '@mui/icons-material/QueryStatsOutlined';
import CardIndex from '../CardIndex';
import './CardGrid.css'

export default function CardGrid({ data, color, title, style }) {
  return <div className='card-grid-wrapper' style={style}>
    <div className='card-grid-header' style={{ backgroundColor: color }}>
      <span className="card-grid-icon" style={{ backgroundColor: color }}><QueryStatsOutlined /></span>
      <h5>{title}</h5>
    </div>
    <div className="card-grid">
      {data.map((d, i) => {
        return <CardIndex key={i} label={d.label} color={color} value={d.value} rank={d.rank} />
      })}
    </div>
  </div>;
}