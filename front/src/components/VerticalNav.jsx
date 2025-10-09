import swim from "../assets/images/swim.svg";
import bike from "../assets/images/bike.svg";
import muscu from "../assets/images/muscu.svg";
import yoga from "../assets/images/yoga.svg";

const VerticalNav = () => {
    return (
        <section className="vertical-nav">
            <nav className="sports-nav">
                <ul className="sports">
                    <li><img src={swim} alt="Swim" /></li>
                    <li><img src={bike} alt="Bike" /></li>
                    <li><img src={muscu} alt="Muscu" /></li>
                    <li><img src={yoga} alt="Yoga" /></li>
                </ul>
            </nav>
            <div className="copyright">
                <p>Copiryght, SportSee 2020</p>
            </div>
        </section>
    );
};

export default VerticalNav;