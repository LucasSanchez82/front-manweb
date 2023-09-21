import { apiGetUtilisateur } from '../api/api';
import { useQuery } from '@tanstack/react-query';

const TestPage = () => {
    const { data, isLoading } = useQuery(['utilisateur'], apiGetUtilisateur);

    return (
        <div>
            <h2>{isLoading ? 'loading...' : 'Bonjour, ' + data.utilisateur.pseudo} </h2>
        </div>
    );
};

export default TestPage;