
function AddTodayHabitForm({onCreateNewTimeStamp, habits, todayHabits, setIsSelectFormOpen}) {
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const habit = Object.fromEntries(data.entries())
        onCreateNewTimeStamp(habit.habitId)
    }

    return (
        <>
            <div className='dashboard__list__header'>
                <h3 className='dashboard__list__title'>Добавить привычку на сегодня</h3>
                <form id='dashboard__list__toggle__form' onSubmit={() => setIsSelectFormOpen(false)}>
                    <button className='dashboard__list__add'>
                        <span className='list__add__text'>Назад</span>
                    </button>
                </form>
            </div>
            <form className='add__today__habit__form' onSubmit={handleSubmit}>
                <select className='modal__input add__today__habit__select' name="habitId" id="habitSelect">
                    {habits.filter(habit => !todayHabits.includes(habit)).map(habit => (
                        <option value={habit.id}>{habit.title}</option>
                    ))}
                </select>
                <button className='add__today__habit__button' type='submit'>Добавить</button>
            </form>
        </>
    )
}

export default AddTodayHabitForm;