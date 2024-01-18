const Total = ({ sumValue }) => {
    const total = sumValue.reduce((total, part) => 
        total + part.exercises, 0);
        
    return <h3>total of {total} exercises</h3>
};

export default Total;