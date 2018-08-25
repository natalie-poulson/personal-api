// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require('./models');

let legacyList = [
    {
        name: "Tadich Grill",
        address: "240 California St, San Francisco, CA 94111",
        yearOpened: 1849,
    },
    {
    name: "Tosca Cafe",
    address: "242 Columbus Ave, San Francisco, CA 94133",
    yearOpened: 1919,
    },
    {
    name: "Sam Wo",
    address: "2713 Clay St, San Francisco, CA 94108",
    yearOpened: 1912,
    },
    {
    name: "Cliff House",
    address: "1090 Point Lobos Ave, San Francisco, CA 94121",
    yearOpened: 1858,
    }
];

db.Legacy.remove( {} , (req,res) => {
    db.Legacy.create(legacyList, (err, newBusiness) => {
        if(err){
            console.log(err);
        }
        console.log("Created a new legacy bar or restaraunt", newBusiness);
        process.exit();
    });
});

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
