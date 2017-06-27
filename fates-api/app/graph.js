/**
 * Graph of the in-character world
 *
 * Created by allison on 6/25/17.
 */

const db = require('./db.js')();
const GraphModel = require('./models/graph.js');

module.exports = {
    all: async ctx => {
        await GraphModel
            .find()
            .then(data => {
                if (data.length > 0) {
                    ctx.body = data[0];
                    return data[0];
                }
                const staticData = new GraphModel({
                    characters: [
                        {
                            fractalType: {
                                type: "character",
                                name: 'Character'
                            },
                            identity: {
                                name: "Zird the Arcane",
                                description: "A sharp-featured scholar with a dark, triangular beard."
                            },
                            refresh: {
                                current: 3,
                                total: 3
                            },
                            aspects: [
                                {
                                    name: "Wizard for Hire",
                                    tags: ["high-concept"]
                                },
                                {
                                    name: "Rivals in the Collegia Arcana",
                                    tags: []
                                },
                                {
                                    name: "If I haven't been there, I've read about it",
                                    tags: []
                                },
                                {
                                    name: "Not in the face!",
                                    tags: []
                                },
                                {
                                    name: "Doesn't suffer fools gladly",
                                    tags: []
                                }

                            ],
                            skills: [

                                // Skill level 0
                                {
                                    name: "common",
                                    skills: []
                                },

                                // Skill level 1
                                {
                                    name: "average",
                                    skills: [
                                        {
                                            name: "fight"
                                        },
                                        {
                                            name: "research"
                                        },
                                        {
                                            name: "contacts"
                                        },
                                        {
                                            name: "notice"
                                        }
                                    ]
                                },

                                // Skill level 2
                                {
                                    name: "fair",
                                    skills: [
                                        {
                                            name: "athletics"
                                        },
                                        {
                                            name: "will"
                                        },
                                        {
                                            name: "investigate"
                                        }
                                    ]
                                },

                                // Skill level 3
                                {
                                    name: "good",
                                    skills: [
                                        {
                                            name: "rapport"
                                        },
                                        {
                                            name: "crafts"
                                        }
                                    ]
                                },

                                // Skill level 4
                                {
                                    name: "great",
                                    skills: [
                                        {
                                            name: "lore"
                                        }
                                    ]
                                },

                                // Skill level 5
                                {
                                    name: "superb",
                                    skills: []
                                },

                                // Skill level 6
                                {
                                    name: "legendary",
                                    skills: []
                                },

                            ],

                            // Stunts are character abilities
                            stunts: [
                                {
                                    name: "occupy-space",
                                    properties: {
                                        f: 'physics.occupy',
                                        position: [0, 0, 0],
                                        boundingBox: [1, 1, 1],
                                        heading: [0, 0, 0]
                                    },
                                    tags: [
                                        "static" // Static stunts hold data that can be used by other systems
                                    ]
                                },
                                {
                                    name: "move",
                                    properties: {
                                        f: 'physics.moveMe',
                                        speed: 1
                                    },
                                    tags: []
                                },
                                {
                                    name: "take-passive-action",
                                    properties: {
                                        f: 'action.passive'
                                    },
                                    tags: []
                                },
                                {
                                    name: "take-active-action",
                                    properties: {
                                        f: 'action.active'
                                    },
                                    tags: []
                                }
                            ],
                            stressTracks: [
                                {
                                    name: "physical",
                                    levels: [
                                        {
                                            checked: true // Level 0 represents whether the character has this track.
                                        },
                                        {
                                            checked: false
                                        },
                                        {
                                            checked: false
                                        }
                                    ]
                                },
                                {
                                    name: "mental",
                                    levels: [
                                        {
                                            checked: true // Level 0 represents whether the character has this track.
                                        },
                                        {
                                            checked: false
                                        },
                                        {
                                            checked: false
                                        },
                                        {
                                            checked: false
                                        },
                                        {
                                            checked: false
                                        }
                                    ]
                                },
                            ],
                            consequences: {
                                allowed: [2, 4, 6],
                                consequences: []
                            }
                        }
                    ]
                });
                staticData.save().then(() => {
                    ctx.body = staticData;
                    return staticData;
                });

            });

    }
};