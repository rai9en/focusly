import {Routes, Route} from "react-router";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Habits from "@/components/Habits/Habits.jsx";
import {useEffect, useMemo, useState} from "react";

function App() {
    const [habits, setHabits] = useState(() => {
        return JSON.parse(localStorage.getItem("habits")) ?? [];
    });

    const [timestamps, setTimestamps] = useState(
        JSON.parse(localStorage.getItem("timestamps")) ?? []
    );

    const [currentDate, setCurrentDate] = useState(new Date().toDateString());

    const getHabitsCount = () => {
        return habits.length;
    }

    const days = {
        'Mon': 'Понедельник',
        'Tue': 'Вторник',
        'Wed': 'Среда',
        'Thu': 'Четверг',
        'Fri': 'Пятница',
        'Sat': 'Суббота',
        'Sun': 'Воскресенье'
    }

    const months = {
        'Jan': 'Января',
        'Feb': 'Февраля',
        'Mar': 'Марта',
        'Apr': 'Апреля',
        'May': 'Мая',
        'Jun': 'Июня',
        'Jul': 'Июля',
        'Aug': 'Августа',
        'Sep': 'Сентября',
        'Oct': 'Октября',
        'Nov': 'Ноября',
        'Dec': 'Декабря',
    }

    const dateParsed = () =>{
        const [day, month, date] = currentDate.split(' ');
        return [day, month, date]
    }

    const getCurrentDateFormatted = () => {
        return `${days[dateParsed()[0]]}, ${dateParsed()[2]} ${months[dateParsed()[1]]} `;
    }

    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits));
    }, [habits]);

    useEffect(() => {
        localStorage.setItem("timestamps", JSON.stringify(timestamps));
    }, [timestamps]);

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/' element={<Dashboard
                    getHabitsCount={getHabitsCount}
                    currentDate={currentDate}
                    habits={habits}
                    timestamps={timestamps}
                    setTimestamps={setTimestamps}
                    getCurrentDateFormatted={getCurrentDateFormatted}
                />}/>
                <Route path='/habits' element={<Habits
                    habits={habits}
                    setHabits={setHabits}
                    timestamps={timestamps}
                    setTimestamps={setTimestamps}
                    getCurrentDateFormatted={getCurrentDateFormatted}
                />}/>
            </Routes>
        </>
    )
}

export default App
