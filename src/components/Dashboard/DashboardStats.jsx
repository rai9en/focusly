
function DashboardStats({ icon, color, title, description }) {
    return (
        <div className="dashboard__stat">
            <span className='material-symbols-rounded dashboard__icon' style={{background: color, color: "white"}}>{icon}</span>
            <div className='dasboard__stat__content'>
                <p className='dashboard__stat__title'>{title}</p>
                <p className='dashboard__stat__description'>{description}</p>
            </div>
        </div>
    )
}

export default DashboardStats;