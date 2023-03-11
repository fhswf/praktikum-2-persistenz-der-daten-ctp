import express from 'express';
import DB from './db.js'

const PORT = process.env.PORT || 3000;

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();

/** global instance of our database */
let db = new DB();

/** Initialize database connection */
async function initDB() {
    await db.connect();
    console.log("Connected to database");
}

// implement API routes

/** Return all todos. 
 *  Be aware that the db methods return promises, so we need to use either `await` or `then` here! 
 */
app.get('/todos', async (req, res) => {
    let todos = await db.queryAll();
    res.send(todos);
});

//
// YOUR CODE HERE
//
// Implement the following routes:
// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    const id =parseInt(req.params.id);
    db.collection('status').queryById(id).findOne()
      .then(res => {
        console.log(res)
      })
      .catch(error => console.error(error))
    // ...
  })
  
  
// POST /todos
// PUT /todos/:id
// DELETE /todos/:id


initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })


app.listen(port, () => {
    console.log(`Example app listening on port ${PORT}`)
    })
