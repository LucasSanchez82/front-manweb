import { apiGetUtilisateur } from '../api/api';
import { useQuery } from '@tanstack/react-query';

const TestPage = () => {
    // useEffect(() => {
    //     console.log(getUtilisateur());
    // }, []);
    // const { data, isLoading, error } = useQuery('utilisateurs', apiGetUtilisateurs)
    const { data, error, isLoading } = useQuery(['utilisateur'], apiGetUtilisateur);
    
    
    const handleClick = async () => {
        // console.log(await apiGetUtilisateurs());
        console.log(data);
        console.log('error : ', error);
        console.log('isLoading : ',isLoading);
        
    }
    return (
        <div>
            <h1><button onClick={handleClick} > mon bouton</button></h1>
            <h2>{isLoading ? 'loading...' : 'Bonjour, ' + data.utilisateur.pseudo} </h2>
        </div>
    );
};

export default TestPage;