function HabitModal({modalIcons, modalColors, habits, setHabits, setIsModalOpen, editHabit, setEditHabit}) {

    const validateTextFields = (text) => {
        return text.trim()
    }

    function handleSubmit(event){
        event.preventDefault()
        const data = new FormData(event.target)
        const {title, description, icon, color} = Object.fromEntries(data.entries())
        createNewHabit(title, description, icon, color)
    }

    const createNewHabit = (title, description, icon, color) => {
        if (
            validateTextFields(title).length > 0 &&
            validateTextFields(description).length > 0
        ) {
            const habit = {
                id: self.crypto.randomUUID(),
                title,
                description,
                icon: modalIcons[icon],
                color: modalColors[color],
            }

            const updatedHabits = [...habits, habit]
            setHabits(updatedHabits)
            localStorage.setItem('habits', JSON.stringify(updatedHabits))
        }
    }

    function handleEdit(event) {
        event.preventDefault()
        const data = new FormData(event.target)
        const {title, description, icon, color} = Object.fromEntries(data.entries())
        editHabitInfo(title, description, icon, color)
    }

    const editHabitInfo = (title, description, icon, color) => {
        editHabit.title = title
        editHabit.description = description
        editHabit.icon = modalIcons[icon]
        editHabit.color = modalColors[color]

        localStorage.setItem('habits', JSON.stringify(habits))

        setEditHabit(null)
    }

    return (
        <>
            <div className='modal__container'>
                <div className='modal__window'>
                    <form id='modalForm' action="" className='modal__form' onSubmit={editHabit ? handleEdit : handleSubmit}>
                        <h3 className=''>Добавление новой привычки</h3>
                        <div className='modal__field'>
                            <label className='modal__label' htmlFor="modalTitle">Привычка</label>
                            <input defaultValue={editHabit === null ? '': editHabit.title} contentEditable={true} id='modalTitle' type="text" name='title' className='modal__input' maxLength='24' minLength='3'/>
                        </div>
                        <div className='modal__field'>
                            <label className='modal__label' htmlFor="modalDescription">Описание</label>
                            <input defaultValue={editHabit === null ? '': editHabit.description} contentEditable={true} id='modalDescription' type="text" name='description' className='modal__input' maxLength='48' minLength='3'/>
                        </div>
                        <div className='modal__form__selects'>
                            <div className='modal__form__select'>
                                <label htmlFor="formIcon" className='modal__label'>Иконка</label>
                                <select name="icon" id="formIcon" className="modal__input">
                                    {Object.keys(modalIcons).map(icon => (
                                        <option selected={ editHabit?.icon === modalIcons[icon] } key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='modal__form__select'>
                                <label htmlFor="formColor" className='modal__label'>Цвет</label>
                                <select name="color" id="formColor" className="modal__input">
                                    {Object.keys(modalColors).map(color => (
                                        <option selected={ editHabit?.color === modalColors[color] } key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className='form__controls'>
                        <button form='modalForm' type='submit' className='modal__form__add'>
                            <span className='list__add__text'>{editHabit ? 'Изменить': 'Добавить'}</span>
                        </button>
                        <button type='submit' className='modal__form__add' onClick={() => setIsModalOpen(false)}>
                            <span className='list__add__text'>Отмена</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HabitModal;