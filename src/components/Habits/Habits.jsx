import {useEffect, useMemo, useState} from "react";
import HabitModal from "@/components/modals/HabitModal.jsx";
import HabitCard from "@/components/Habits/HabitCard.jsx";

function Habits({habits, setHabits, timestamps, setTimestamps}) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filterText, setFilterText] = useState("");

    const [editHabit, setEditHabit] = useState(null);

    const getFilteredHabits = useMemo(() => {
        return filterText.length === 0 ? habits : habits.filter((habit) => (habit.title.toLowerCase().includes(filterText)))
    }, [filterText, habits])

    const handleBlur = (event) => {
        const filter = event.currentTarget.value.trim().toLowerCase();
        setFilterText(filter);
    }

    const handleDelete = (habitId) => {
        const currentHabits = habits.filter((habit) => habit.id !== habitId);
        const currentTimestamps = timestamps.filter((timestamp) => timestamp.habitId !== habitId);
        setTimestamps([...currentTimestamps]);
        setHabits(currentHabits);
    }

    const modalIcons = {
        'Здоровье': 'health_cross',
        'Еда': 'lunch_dining',
        'Спорт': 'fitness_center',
        'Учеба': 'import_contacts',
        'Хобби': 'sports_esports'
    }
    const modalColors = {
        'Красный': '#dc596e',
        'Фиолетовый': '#7268EB',
        'Зеленый': '#1AB67B',
        'Синий': '#5491d7',
        'Желтый': '#d7c654'
    }

    return (
        <div className="container">
            <div className='dashboard__header'>
                <div className='dashboard__header__greeting'>
                    <h1 className='dashboard__header__title'>Все привычки</h1>
                    <h2 className='dashboard__header__secondary'>Управляйте своими привычками и следите за прогрессом</h2>
                </div>
                <div className='dashboard__header__date'>
                </div>
            </div>
            <div className='habits__from__container'>
                <div className='habits__form'>
                    <input onInput={handleBlur} className='modal__input search__input' type="text" placeholder='Поиск по названию...'/>
                    <button className='modal__form__add create-habit' onClick={() => setIsModalOpen(true)}>
                        Создать новую привычку
                    </button>
                </div>
            </div>
            { habits.length > 0
                ? <div className="habits__list">
                    {getFilteredHabits.map((habit) => (
                        <HabitCard
                            habit={habit}
                            handleDelete={handleDelete}
                            setEditHabit={setEditHabit}
                            setIsModalOpen={setIsModalOpen}
                        />
                    ))}
                </div>
                : <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <img src='src/assets/asIP2GgkFQ.gif' alt="" style={{ width: '20%' }} />
                </div>
            }
            {
                isModalOpen &&
                <HabitModal
                    modalIcons={modalIcons}
                    modalColors={modalColors}
                    habits={habits}
                    setHabits={setHabits}
                    setIsModalOpen={setIsModalOpen}
                    editHabit={editHabit}
                    setEditHabit={setEditHabit}
                />
            }
        </div>
    )
}

export default Habits;