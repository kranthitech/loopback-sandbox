var loopback = require('loopback')

var ds = loopback.memory()


var Author = ds.createModel(
    'Author', {
        firstName: {
            type: 'string',
            required: true
        },
        lastName: 'string'
    }, {
        strict: true
    }
)
var PenName = ds.createModel(
    'PenName', {
        name: {
            type: 'string',
            required: true
        },
        inspiration: 'string'
    }
)

Author.embedsOne('PenName', {
    as: 'knownAs',
    property: 'penName',
    options: {
        forceId: true
    }
})

Author.create({
    firstName: "Charles Lutwidge",
    lastName: "Dodgson",
    penName: {
        name: 'Lewis Carroll',
        inspiration: 'Latin'
    }
}, function(err, obj) {
    if (err) {
        console.log('error in creating Lewis Carroll')
    } else {

        Author.find({}, function(err, instances) {
            console.log('Created Lewis Carroll. Current list of Authors')
            console.log(instances)

            PenName.find({}, function(err, pen_names) {
                console.log('Current list of PenNames')
                console.log(pen_names)
            })

        })
    }
})