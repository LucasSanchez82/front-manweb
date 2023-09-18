import React from 'react';

const SearchbarComponent = (props: {setSearchState: (value: string) => void}) => {
    const { setSearchState } = props;
    // const [ searchValue, setSearchValue ] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchState(event.currentTarget.value);
    }
    return (
        <div id="searchbar-container">
            <input type="search" name="searchbar" id="searchbar" onChange={handleChange} placeholder='rechercher mon titre...'/>
        </div>
    );
};

export default SearchbarComponent;