export const OrderItem = ({title, name, phone}) => {
    return (
        <div className="card">
            <div className="card-title">{title}</div>
            <div className="card-content">Название: {name}</div>
            <div className="card-content">Телефон: {phone}</div>
        </div>
    )
}
