const recordService = require('../services/recordService');

const getRecordForWorkout = (req, res) =>
{
    try {
        const { params: { workoutId } } = req;
        if (!workoutId)
        {
            res.status(400).send({status: 'FAILED', data: {error:"Parameter: ':workoutId' can not be empty"}});
            return;
        }
        const allRecordForWorkout = recordService.getRecordForWorkout(workoutId);
        res.send({status: 'OK', data: allRecordForWorkout});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: 'FAILED', data: {error: error?.message || error}});        
    }
}

module.exports = { getRecordForWorkout };