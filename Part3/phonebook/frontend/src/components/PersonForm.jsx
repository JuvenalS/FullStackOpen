const PersonForm = ({ 
    addName,
    newName,
    handlePersonChange,
    newNumber,
    handlePersonNumberChange
 }) => {

    return (
        <div>
            <form onSubmit={addName}>
                <label>Name: <div><input type="text" value={newName} onChange={handlePersonChange} /></div>
                </label>
                <label>Number: <div><input type="tel" value={newNumber} onChange={handlePersonNumberChange} /></div>
                </label>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm;