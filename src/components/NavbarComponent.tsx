import { Link, useNavigate } from "react-router-dom";
import { apiGetUtilisateur, apiLogout } from "../api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const NavbarComponent = () => {
    const { data, isLoading } = useQuery(['utilisateur'], apiGetUtilisateur);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiLogout();
            queryClient.invalidateQueries(['utilisateur']);
        } catch (error) {
            console.error(error)
        }
        // window.location.reload()

        navigate('/login')

    }
    return (
        <>
            <h1>ManWeb !</h1>
            <h2>{!isLoading && (data.utilisateur.pseudo && 'Bonjour, ' + data.utilisateur.pseudo)}</h2>
            <div id='navbar'>
                <ul>

                    {!isLoading && (data.isLogin &&
                        <>
                            <li><Link to='/'> Mangas Page</Link></li>
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