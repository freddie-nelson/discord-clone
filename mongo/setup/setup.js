const conn = new Mongo();
const db = conn.getDB("mustap");

db.createUser({ 
    user:"admin",
    pwd:"6zm$fMY9*x5QH54Cm*^Zd8ra",
    roles:[{ role:"readWrite", db:"mustap" }]
});
