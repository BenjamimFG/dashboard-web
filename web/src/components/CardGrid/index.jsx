import CardIndex from '../CardIndex';
import './CardGrid.css'

export default function CardGrid({ data, color }) {
  return <div className='card-grid-wrapper'>
    <div className='card-grid-header' style={{ backgroundColor: color }}>
      <span className="card-grid-icon" style={{ backgroundColor: color }}>icon</span>
      <h5>Capacidades</h5>
    </div>
    <div className="card-grid">
      {data.map((d, i) => {
        return <CardIndex key={i} label={d.label} color={color} value={d.value} rank={d.rank} />
      })}
    </div>
  </div>;
}