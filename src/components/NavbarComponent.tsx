import { Link, useNavigate } from "react-router-dom";
import { apiLogout } from "../api/api";
import { Query } from "../types";



const NavbarComponent: React.FC<Query> = ({query}) => {
    const { data, isLoading, refetch } = query;
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await apiLogout();
            await refetch();
            navigate('/login')
            
        } catch (error) {
            console.error(error)
        }


    }
    return (
        <>
            <h1>ManWeb !</h1>
            <h2>{!isLoading && (data.utilisateur.pseudo && 'Bonjour, ' + data.utilisateur.pseudo)}</h2>
            <div id='navbar'>
                <ul>

                    {!isLoading && (data.isLogin &&
                        <>
                            <li><Link to='/mangas'> Mangas Page</Link></li>
                            <li><button type="button" onClick={handleLogout}>logout</button> </li>
                        </>
                    )}

                    {!isLoading && (!data.isLogin &&
                        <>
                            <li><Link to='/login'> login page</Link></li>
                            <li><Link to='/signin'> sign in page</Link></li>
                        </>
                    )}

                </ul>
            </div>
        </>
    );
};

export default NavbarComponent;