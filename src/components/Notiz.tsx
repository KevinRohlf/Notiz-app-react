function Notiz({ title="" , description="", onDelete, onEdit }: {title: string, description: string, onDelete: () => void, onEdit: () => void}) {
    return ( <li>
        <h2>{title}</h2>
        <div>
            {description}
        </div>
        <button onClick={onDelete}>delete</button>
        <button onClick={onEdit}>edit</button>
    </li> );
}

export default Notiz;