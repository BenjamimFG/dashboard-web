import './CardIndex.css'

export default function CardIndex({ rank, value, label, color }) {
  return <div className="card">
    <span className="icon">icon</span>
    <div className="card-container">
      <div className="left">
        <div className='label'>2022</div>
        <div className='data'>{rank.padStart(2, '0') + 'º'}</div>
      </div>
      <div className="right">
        <div className='label'>Valor</div>
        <div className='data'>{value}</div>
      </div>
    </div>
    <div className="card-footer" style={{ backgroundColor: color }}>
      {label}
    </div>
  </div>;
}