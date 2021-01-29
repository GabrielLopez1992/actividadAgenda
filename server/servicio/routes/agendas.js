const agendasController = require('../controllers/agendas');



module.exports = (app) => {
    app.get('/api/agendas', agendasController.list)
    app.get('/api/agenda/:id', agendasController.getById)
    app.post('/api/agenda', agendasController.create)
    app.put('/api/agenda/:id', agendasController.update)
    app.delete('/api/agenda/:id', agendasController.remove)

}