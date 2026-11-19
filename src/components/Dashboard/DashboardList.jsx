import DashboardListItem from "./DashboardListItem.jsx";

function DashboardList({habits, onToggleHabitStatus, toggledHabitTimestamp, setIsSelectFormOpen, timestamps, getCurrentDate, onDeleteTimeStamp}) {

    const handleToggleSelectForm = (event) =>{
        event.preventDefault()
        setIsSelectFormOpen(true)
    }

    return (
        <>
            <div className='dashboard__list__header'>
                <h3 className='dashboard__list__title'>Привычки на сегодня</h3>
                <form id='dashboard__list__toggle__form' onSubmit={handleToggleSelectForm}>
                    <button className='dashboard__list__add'>
                        <span className='list__add__text'>Добавить</span>
                    </button>
                </form>
            </div>
            <div className='dashboard__list'>
                {habits.map((habit) => (
                    <DashboardListItem
                        habit={habit}
                        onToggleHabitStatus={onToggleHabitStatus}
                        toggledHabitTimestamp={toggledHabitTimestamp}
                        timestamps={timestamps}
                        getCurrentDate={getCurrentDate}
                        onDeleteTimeStamp={onDeleteTimeStamp}
                    />
                ))}
            </div>
        </>
    )
}

export default DashboardList;