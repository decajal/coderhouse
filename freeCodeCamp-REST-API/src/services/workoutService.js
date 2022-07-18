const { v4: uuid } = require('uuid');
const Workout = require('../database/Workout');

const getAllWorkouts = (filterParams) =>
{
    try {
        const allWorkouts = Workout.getAllWorkouts(filterParams);
        return allWorkouts;            
    } catch (error) {
        throw error;
    }
}

const getOneWorkout = (workoutId) =>
{
    try {
        const workout = Workout.getOneWorkout(workoutId);
        return workout;            
    } catch (error) {
        throw error;
    }
}

const createNewWorkout = (newWorkout) =>
{
    const workoutToInsert = 
    {
        ...newWorkout,
        id: uuid(),
        createAt: new Date().toLocaleString('es-AR', { timeZone: 'UTC' }),
        updateAt: new Date().toLocaleString('es-AR', { timeZone: 'UTC' }),
    }
    try {
        const createWorkout = Workout.createNewWorkout(workoutToInsert);
        return createWorkout;
    } catch (error) {
        throw error;
    }
}

const updateOneWorkout = (workoutId, changes) =>
{
    try {
        const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
        return updatedWorkout;            
    } catch (error) {
        throw error;
    }
}

const deleteOneWorkout = (workoutId) =>
{
    try {
        Workout.deleteOneWorkout(workoutId);        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
}