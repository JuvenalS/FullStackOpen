import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ courses }) => {

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                <div key={course.id}>
                  <Header name={course.name} />
                  <Content key={course.id} parts={course.parts} />
                  <Total sumValue={course.parts} />
                </div>
            ))}
        </div>
    )
}

export default Course;