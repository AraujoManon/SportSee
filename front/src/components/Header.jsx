import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo de SportSee" />
      </div>
      <nav className="nav">
        <ul>
          <li>
            <a href="#"> Accueil</a>
          </li>
          <li>
            <a href="#">Profil</a>
          </li>
          <li>
            <a href="#">Réglage</a>
          </li>
          <li>
            <a href="#">communauté</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;