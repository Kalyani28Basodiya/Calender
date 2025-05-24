import React from 'react'
import { useState, useEffect } from 'react';
import "./Calender.css";
const Calender = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonths, setDaysInMonths] = useState([]);
    const [startDay, setStartDay] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        setDaysInMonths(days);
        setStartDay(new Date(year, month, 1).getDay());


    }, [currentDate])

    const daysName = ["MON", 'TUE', "WED", "THU", "FRI", "SAT", "SUN"]

    const prevMonth = () => {
        const prev = new Date(currentDate); // clone currentDate
        prev.setMonth(prev.getMonth() - 1);
        setCurrentDate(prev);
    }

    const nextMonth = () => {
        const next = new Date(currentDate); // clone currentDate
        next.setMonth(next.getMonth() + 1);
        setCurrentDate(next);
    }

    const handleDateClick = (date) => {
        setSelectedDate(date)
    }
    return (
        <div className='calender'>
            <div className="header">
                <button onClick={prevMonth}>&lt;</button>
                <span>
                    {currentDate.toLocaleString('default', { month: "long" })}{' '}
                    {currentDate.getFullYear()}
                </span>
                <button onClick={nextMonth}>&gt;</button>
            </div>
            <div className="day-names">
                {
                    daysName.map((day) => {
                        return <div key={day} className="day-name">
                            {day}
                        </div>
                    })
                }
            </div>

            <div className="days">
                {
                    Array.from({ length: startDay }).map((_, index) => (
                        <div key={index} className="empty-day"></div>
                    ))
                }
                {
                    
                        daysInMonths.map((day) => {
                            return (
                                <div
                                    key={day.toDateString()}
                                    className={`day 
                ${day.getDate() === new Date().getDate() &&
                                            day.getMonth() === new Date().getMonth() &&
                                            day.getFullYear() === new Date().getFullYear() ? 'today' : ''} 
                ${selectedDate && day.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day.getDate()}
                                </div>
                            );
                        })
                    }
            </div>
        </div>
    )
}

export default Calender;