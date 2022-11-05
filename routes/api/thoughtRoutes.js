//Syntax based on 18-26 activity

const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts endpoint
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtId endpoint
router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// api/applications/:thoughtId/reactions endpoint

router.route('/:thoughtId/reactions').post(addReaction);

// api/applications/:thoughtId/reactions/:reactionId endpoint

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;