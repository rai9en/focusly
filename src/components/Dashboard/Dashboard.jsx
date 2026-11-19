import {memo, useEffect, useMemo, useState} from "react";
import DashboardStats from "./DashboardStats.jsx";
import DashboardList from "./DashboardList.jsx";
import AddTodayHabitForm from "@/components/Dashboard/AddTodayHabitForm.jsx";

function Dashboard({getHabitsCount, currentDate, habits, timestamps, setTimestamps, getCurrentDateFormatted}) {

    const [toggledHabit, setToggledHabit] = useState({});

    const [todayHabits, setTodayHabits] = useState( () => {
        const todayTimestamps = timestamps.filter(timestamp => timestamp.date === currentDate);
        const todayHabitIds = todayTimestamps.map(timestamp => timestamp.habitId);
        return habits.filter(habit => todayHabitIds.includes(habit.id)) ?? [];
    });

    const [toggledHabitTimestamp, setToggledHabitTimestamp] = useState({});

    const [isSelectFormOpen, setIsSelectFormOpen] = useState(false);

    const toggleHabitStatus = (relatedTimestamp) => {
        const prevState = timestamps.filter(timestamp => (timestamp.habitId !== relatedTimestamp.habitId || timestamp.date !== currentDate));
        relatedTimestamp.isDone = !relatedTimestamp.isDone;
        setTimestamps([...prevState, relatedTimestamp])
    }

    const dateParser = (dateToParse) => {
        const [day, month, date] = dateToParse.split(' ')
        return [day, month, date]
    }

    const getThisWeekTimestampsFormatted = () => {
        const thisWeek = timestamps.filter(timestamp => {
            const thisDay = new Date();
            const iterDay = new Date(timestamp.date)
            const diffMs = thisDay - iterDay;
            const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
            return diffDays <= 7;
        })

        const week = [
            {day: 'Mon', doneHabits: 0, totalHabits: 0},
            {day: 'Tue', doneHabits: 0, totalHabits: 0},
            {day: 'Wed', doneHabits: 0, totalHabits: 0},
            {day: 'Thu', doneHabits: 0, totalHabits: 0},
            {day: 'Fri', doneHabits: 0, totalHabits: 0},
            {day: 'Sat', doneHabits: 0, totalHabits: 0},
            {day: 'Sun', doneHabits: 0, totalHabits: 0},
        ]

        thisWeek.forEach(day => {
            const dayOfWeek = week.find(d => d.day === dateParser(day.date)[0])
            dayOfWeek.totalHabits++;
            if (day.isDone) dayOfWeek.doneHabits++;
        })

        return week
    }

    const getDoneHabitsCount = useMemo(() => {
        const todayDoneTimestamps = timestamps.filter(timestamp => (timestamp.date === currentDate && timestamp.isDone));
        return todayDoneTimestamps.map(timestamp => timestamp.habitId).length;
    }, [timestamps]);

    const getStatisticsPercentage = useMemo(() => {
        const week = getThisWeekTimestampsFormatted()
        const totalTimestamps = week.map(timestamp => timestamp.totalHabits).reduce((acc, current) => acc + current, 0)
        const doneTimestamps = week.map(timestamp => timestamp.doneHabits).reduce((acc, current) => acc + current, 0)
        if (totalTimestamps !== 0) {
            return Math.floor(doneTimestamps/totalTimestamps * 100)
        }
        return 0
    }, [timestamps])

    const getCurrentStreak = useMemo(() => {
        const completedDates = new Set(
            timestamps
                .filter(timestamp =>
                    timestamp.isDone
                )
                .map(timestamp => timestamp.date)
        )

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        let streak = 0

        if (!completedDates.has(today.toDateString())) {
            today.setDate(today.getDate() - 1)
        }

        while (completedDates.has(today.toDateString())) {
            streak++
            today.setDate(today.getDate() - 1)
        }

        if ( streak === 1 ) return `${streak} день`
        else if (streak === 2 || streak === 3 || streak === 4 ) return `${streak} дня`
        else return `${streak} дней`

    }, [timestamps])

    const createNewTimeStamp = (habitId) => {
        if (!habitId) return

        const newTimeStamp = {
            habitId: habitId,
            date: new Date().toDateString(),
            isDone: false
        }
        setTimestamps(prevState => [...prevState, newTimeStamp])
    }

    const deleteTimeStamp = (habitId) => {
        const updatedTimestamps = timestamps.filter(timestamp => timestamp.habitId !== habitId || timestamp.date !== currentDate);

        setTimestamps([...updatedTimestamps])
    }

    useEffect(() => {
        localStorage.setItem("timestamps", JSON.stringify(timestamps));

        const todayTimestamps = timestamps.filter(timestamp => timestamp.date === currentDate);
        const todayHabitIds = todayTimestamps.map(timestamp => timestamp.habitId);
        setTodayHabits(habits.filter(habit => todayHabitIds.includes(habit.id)) ?? [])
    }, [timestamps])

    return (
        <div className="container">
            <div className='dashboard__header'>
                <div className='dashboard__header__greeting'>
                    <h1 className='dashboard__header__title'>Доброе утро!<span className='dashboard__header__icon'> 👋</span></h1>
                    <h2 className='dashboard__header__secondary'>Пусть сегодня будет продуктивный день!</h2>
                </div>
                <div className='dashboard__header__date'>
                    <span>{getCurrentDateFormatted()}</span>
                    <span></span>
                </div>
            </div>
            <div className='dashboard__content'>
                <div className='dashboard__statistics'>
                    <DashboardStats
                        icon='star'
                        color='#7268EB'
                        title='Доступно привычек'
                        description={getHabitsCount()}
                    />
                    <DashboardStats
                        icon='check'
                        color='#1AB67B'
                        title='Выполнено сегодня'
                        description={`${getDoneHabitsCount}/${todayHabits.length}`}
                    />
                    <DashboardStats
                        icon='bar_chart'
                        color='#1AB67B'
                        title='Статистика за неделю'
                        description={`${getStatisticsPercentage}%`}
                    />
                </div>
                <div className='dashboard__main'>
                    <div className='dashboard__main__list'>
                        {!isSelectFormOpen
                            ? <DashboardList
                                habits={todayHabits}
                                onToggleHabitStatus={toggleHabitStatus}
                                setToggledHabit={setToggledHabit}
                                toggledHabit={toggledHabit}
                                toggledHabitTimestamp={toggledHabitTimestamp}
                                setIsSelectFormOpen={setIsSelectFormOpen}
                                timestamps={timestamps}
                                getCurrentDate={currentDate}
                                onDeleteTimeStamp={deleteTimeStamp}
                            />
                            : <AddTodayHabitForm
                                habits={habits}
                                todayHabits={todayHabits}
                                onCreateNewTimeStamp={createNewTimeStamp}
                                setIsSelectFormOpen={setIsSelectFormOpen}
                            />
                        }
                    </div>
                    <div className='dashboard__main__list'>
                        <div className='dashboard__list__header'>
                            <h3 className='dashboard__list__title'>Активность за неделю</h3>
                        </div>
                        <div className='stats__list'>
                            {getThisWeekTimestampsFormatted().map((day) => {
                                const {doneHabits, totalHabits} = day;
                                let opacity = '0.2'
                                let height = '10%'
                                let percentage = '0%'
                                if (doneHabits !== 0 && totalHabits !== 0) {
                                    opacity = String(doneHabits/totalHabits)
                                    height = String(doneHabits/totalHabits * 100) + '%'
                                    percentage = String(Math.floor(doneHabits/totalHabits * 100)) + '%'
                                }
                                return (<div className='stats__column__item' style={{height: height}}>
                                    <div className='stats__percentage'><span>{percentage}</span></div>
                                    <div className='stats__column' style={{opacity: opacity}}></div>
                                </div>)
                            })}
                        </div>
                        <div className='stats__days'>
                            <div className='stats__day'>Пн</div>
                            <div className='stats__day'>Вт</div>
                            <div className='stats__day'>Ср</div>
                            <div className='stats__day'>Чт</div>
                            <div className='stats__day'>Пт</div>
                            <div className='stats__day'>Сб</div>
                            <div className='stats__day'>Вс</div>
                        </div>
                        <div className='stats__streak'>
                            <div className='material-symbols-rounded streak__icon'>mode_heat</div>
                            <div className='streak__text'>Текущая серия: <span>{getCurrentStreak}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(Dashboard)