
function DashboardListItem({habit, onToggleHabitStatus, timestamps, getCurrentDate, onDeleteTimeStamp}) {

    const getRelatedTimestamp = () => {
        return timestamps.find(timestamp => (timestamp.habitId === habit.id && timestamp.date === getCurrentDate));
    }

    const handleToggleHabitStatus = (event) => {
        event.preventDefault()
        onToggleHabitStatus(getRelatedTimestamp())
    }

    const handleDeleteHabit = (event) => {
        event.preventDefault()
        onDeleteTimeStamp(habit.id)
    }

    return (
        <div className='list__item__container'>
            <div className='list__item__header'>
                <span style={{background: habit.color}} className='material-symbols-rounded item__icon'>{habit.icon}</span>
                <div className='list__item__content'>
                    <p className='list__item__title'>{habit.title}</p>
                    <p className='list__item__description'>{habit.description}</p>
                </div>
            </div>
            <div className='list__item__controls'>
                <form className='list__item__form' onSubmit={handleToggleHabitStatus}>
                    <button type='submit' className={getRelatedTimestamp()?.isDone ? 'list__item__controls__done' : 'list__item__controls__pending'}>
                        <span className='material-symbols-rounded'>check</span>
                    </button>
                </form>
                <form className='list__item__form' onSubmit={handleDeleteHabit}>
                    <button type='submit' className='list__item__controls__delete'>
                        <span className='material-symbols-rounded'>close</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DashboardListItem;