import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_EXERCISES } from '../utils/queries';
import weights from '../images/weights.jpg';
import loadingImage from '../images/loading.gif';

const ExerciseList = () => {
    const [muscle, setMuscle] = useState('');
    const [searchExercises, { loading, error, data }] = useLazyQuery(GET_EXERCISES, {
        variables: { muscle },
    });

    const handleInputChange = (e) => {
        setMuscle(e.target.value);
    };

    const handleSearch = () => {
        searchExercises();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const exercises = data?.getExercises || [];

    return (
        <div className="exerciseBg" style={{ backgroundImage: `url(${weights})` }}>
            <div className="exerciseContainer">
                <div>
                    <h1 className="exerciseHeader">Recommended Exercises</h1>
                    <div>
                        <input className="exercise-input"
                            type="text"
                            placeholder="Enter a muscle group"
                            value={muscle}
                            onChange={handleInputChange}
                        />
                        <button className="exercise-btn" onClick={handleSearch}>Search</button>
                    </div>
                    {exercises.length > 0 ? (
                        exercises.map((exercise) => (
                            <div key={exercise.name}>
                                <h3>{exercise.name}</h3>
                                <p>Type: {exercise.type}</p>
                                <p>Muscle: {exercise.muscle}</p>
                                <p>Equipment: {exercise.equipment}</p>
                                <p>Difficulty: {exercise.difficulty}</p>
                                <p>Instructions: {exercise.instructions}</p>
                            </div>
                        ))
                    ) : (
                        <img src={loadingImage} alt="anime squat" className="loadingExercise" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseList;
