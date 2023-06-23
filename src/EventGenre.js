import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = () => {
            const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
            const data = genres.map((genre) => {
                const value = events.filter((event) => event.summary.includes(genre)).length;
                return { name: genre, value };
            });
            return data;
        };

        setData(getData());
    }, [events]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div className="genre-chart">
            <h3>Event Genre Chart</h3>
            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
};

export default EventGenre;
