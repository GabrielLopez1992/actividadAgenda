
const agendas = require('../models').agendas;



function create(req, res){
    console.log('req.body ', req.body);
    agendas.create(req.body)
    .then(agenda=>{
        console.log('ok ');
        res.status(200).send({agenda});
    })
    .catch(err=>{
        res.status(500).send({msg : 'No ha guardado la agenda...!'});
    })

}

function update(req, res){
    var id = req.params.id;

    agendas.findOne({ where: { age_codigo: id } })
    
    .then(agenda => {
        if (agenda != null) {
            agenda.update(req.body)
            .then(() => {
                res.status(200).send({agenda});
            })
            .catch(err => {
                res.status(500).send({err});
            })
        } else {
            res.status(500).send({msg : 'La agenda ' + id + ' no existe...!'});
        }
    })
    .catch(err => {
        res.status(500).send({err});
    });
}




function getById(req, res){
    var id = req.params.id;
    
    agendas.findOne({ where: { age_codigo: id } })
    .then(agenda=>{
        res.status(200).send({agenda});
    })
    .catch(err=>{
        res.status(500).send({err});
    })

}


function remove(req, res){
   
    var id = req.params.id;

    agendas.findOne({ where: { 
        age_codigo: id,
    } })
    
    .then(agendaBuscar => {

        if (agendaBuscar != null){
            agendas.destroy({
                where: {
                    age_codigo : id,
                }
            })
            .then(agenda => {
                res.status(200).send({agenda});
            })
            .catch(err => {
                res.status(500).send({message:"Ocurrio un error al eliminar la agenda"});
            })
        } else {
            res.status(500).send({msg : 'La agenda ' + id + ' no existe...!'});
        }
    })
    .catch(err => {
        res.status(500).send({err});
    });
}



function list(req, res){
   

    agendas.findAll()
    
    .then(agendaLista => {
        res.status(200).send(agendaLista);
      
    })
    .catch(err => {
        res.status(500).send({msg : 'no existe agenda registrada'});
    });
}

module.exports={
    list, getById, create, update, remove
}