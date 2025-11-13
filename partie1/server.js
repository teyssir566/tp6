const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', { user: 'Tayssir' }); 

});
let tasks = [
{ id: 1, title: 'Apprendre Express', done: false },
{ id: 2, title: 'Créer une application de démonstration', done: false },
];

app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks, totalTasks: tasks.length });
});

// Récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});
app.get('/about', (req, res) => {
  res.render('about', { name: 'Teyssir', course: 'Node.js et Express.js', year: 2025 });
});

app.use(express.urlencoded({ extended: true }));

// Ajouter une nouvelle tâche
/*app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    done: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
*/
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Le titre est requis.' });
  }
  const newTask = { id: tasks.length + 1, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
app.get('/contact', (req, res) => {
  res.render('contact', { email: 'lamiriteyssir@example.com' });
});

app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur
http://localhost:${PORT}`));