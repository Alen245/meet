import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(getData());
    }, [events]);

    const getData = () => {
        const genreData = genres.map((genre) => {
            const filteredEvents = events.filter((event) =>
                event.summary.toLowerCase().includes(genre.toLowerCase())
            );
            return { name: genre, value: filteredEvents.length };
        });
        return genreData;
    };

    return (
        <div className="data-vis-wrapper">
            <PieChart width={400} height={300}>
                <Pie
                    dataKey="value"
                    data={data}
                    cx={200}
                    cy={150}
                    outerRadius={100}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default EventGenre;
