import { Link, useLocation } from 'react-router-dom'
import { navList, navListRight } from '../data/MainNavData'
function MainNav() {
    const rutaPagina = useLocation().pathname
    console.log(rutaPagina)
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark sticky-top" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Ideas Digitales</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/*
                        <li className="nav-item">
                            <a className="nav-link" href="#nosotros">Nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#noticias">Noticias</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#historia">Historia</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#envios">Envios</a>
                        </li>
                        */}
                        {
                            navList.map((item, index) =>
                                <li className="nav-item" key={index}>
                                    <Link className={rutaPagina === item.path ? "nav-link active" : "nav-link"}
                                        to={item.path}>{item.text}</Link>
                                </li>
                            )
                        }



                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">

                        {
                            navListRight.map((item, index) =>
                                <li className="nav-item" key={index}>
                                    <Link className={rutaPagina === item.path ? "nav-link active" : "nav-link"}
                                        to={item.path}><i className={item.icono} title={item.title}></i> {item.text}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MainNav