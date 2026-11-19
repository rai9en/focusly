
function HabitCard({habit, handleDelete, setEditHabit, setIsModalOpen}) {

    function handleEdit() {
        setEditHabit(habit)
        setIsModalOpen(true)
    }

    return (
        <div className='habit__card'>
            <div className='list__item__header'>
                <span style={{background: habit.color}} className='material-symbols-rounded item__icon'>{habit.icon}</span>
                <div className='list__item__content'>
                    <p className='list__item__title'>{habit.title}</p>
                    <p className='list__item__description'>{habit.description}</p>
                </div>
            </div>
            <div className='list__item__controls'>
                <button type='submit' className='habit-control' onClick={handleEdit}>
                    <span className='material-symbols-rounded'>edit</span>
                </button>
                <button type='submit' className='habit-control' onClick={() => handleDelete(habit.id)}>
                    <span className='material-symbols-rounded'>delete</span>
                </button>
            </div>
        </div>
    )
}

export default HabitCard;