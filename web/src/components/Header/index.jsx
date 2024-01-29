import './Header.css';

export default function Header({ icon, title, children }) {
  return (
    <header>
      <span className="title-wrapper">
        {icon}
        <h1>{title}</h1>
      </span>
      {children}
    </header>
  );
}