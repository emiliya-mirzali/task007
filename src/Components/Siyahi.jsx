import React, { useState, useEffect } from 'react';
import './Siyahi.css';

function App() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState(false);

    useEffect(() => {
        fetch('https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFilteredData(data);
            });
    }, []);

    const handleSearch = () => {
        if (/\s/.test(searchTerm) || /\d/.test(searchTerm)) {
            setSearchError(true);
            setFilteredData([]);
        } else {
            setSearchError(false);
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div className='container'>
            <div className='inp'>
                <input
                    type="text"
                    placeholder="Search..." name="searchTerm"
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={handleSearch}>Search</button>
            </div>
            {searchError && <p><strong>no result</strong></p>}
            <ul>
                {filteredData.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.department}, {item.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default App;