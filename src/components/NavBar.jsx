import {Link} from 'react-router';

function NavBar() {
    return (
        <div className="nav__container">
            <div className='nav__top'>
                <div className="nav__header">
                    <span className="material-symbols-rounded nav__logo">eco</span>
                    <p className='nav__title'>Focusly</p>
                </div>
                <div className="nav__links">
                    <Link className='nav__link active' to={'/'}>
                        <span className="material-symbols-rounded nav__link__icon">home</span>
                        <span className="nav__link__title">Главная</span>
                    </Link>
                    <Link className='nav__link' to={'/habits'}>
                        <span className="material-symbols-rounded nav__link__icon">format_list_bulleted</span>
                        <span className="nav__link__title">Все привычки</span>
                    </Link>
                </div>
            </div>
            <div className='nav__bottom'>
                <div style={{display: "flex"}}></div>
            </div>
        </div>
    )
}

export default NavBar;