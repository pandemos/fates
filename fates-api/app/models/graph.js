/**
 * Created by allison on 6/25/17.
 */

const mongoose = require('mongoose');

const FractalType = new mongoose.Schema({
   type: String,
    name: String
});

const Identity = new mongoose.Schema({
   name: String,
    description: String
});

const Refresh = new mongoose.Schema({
    current: Number,
    total: Number
});

const Aspect = new mongoose.Schema({
   name: String,
    tags: [String]
});

const Skill = new mongoose.Schema({
   name: String
});

const SkillLevel = new mongoose.Schema({
   name: String,
    skills: [Skill]
});

const Stunt = new mongoose.Schema({
    name: String,
    properties: Object,
    tags: [String]

});

const StressTrackLevel = new mongoose.Schema({
   checked: Boolean
});

const StressTrack = new mongoose.Schema({
    name: String,
    levels: [StressTrackLevel]
});

const Consequence = new mongoose.Schema({
    allows: [Number],
    consequences: [String]
});

const Character = new mongoose.Schema({

    fractalType: FractalType,
    identity: Identity,
    refresh: Refresh,
    aspects: [Aspect],
    skills: [SkillLevel],
    stunts: [Stunt],
    stressTracks: [StressTrack],
    consequences: [Consequence]

});

const GraphSchema = new mongoose.Schema({

    characters: [Character]

});

const Graph = mongoose.model('Graph', GraphSchema);

module.exports = Graph;
