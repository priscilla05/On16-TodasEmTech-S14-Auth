const Colaboradoras= require('../models/colaboradorasModel')// é um objeto por isso letra maiusc.
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const SECRET = process.env.SECRET



const create = (req, res) => {
    const senhaComHash = bcrypt.hashSync(req.body.senha, 10)
    req.body.senha = senhaComHash
  
    const colaboradora = new Colaboradoras(req.body)
    
    colaboradora.save(function (err) {
      if (err) {
        res.status(500).send({message: err.message})
      }
      res.status(201).send(colaboradora)
    })
  }
  
  const getAll = (req, res) => {
    Colaboradoras.find(function (err, colaboradoras) {
      if (err) {
        res.status(500).send({message: err.message})
      }
      res.status(201).send(colaboradoras)
    })
  }
  
  const deleteById = async (req, res) => {
    try {
  
      const { id } = req.params
      await Colaboradoras.findByIdAndDelete(id)
      
      res.status(200).json({message: `A colaboradora com o id ${id} foi deletado com sucesso`})
    } catch (error) {
      console.error(error)
      res.status(500).json({message: error.message})
    }
  }
  
  const login = (req, res) => {
    Colaboradoras.findOne({email: req.body.email}, function (error, colaboradora) {
      if (error) {
        return res.status(500).send({message: 'deu ruim'})
      }
      if (!colaboradora) {
        res.status(404).send(`Não existe colaboradora com esse email: ${req.body.email}`)
      }
      
      const senhaValida = bcrypt.compareSync(req.body.senha, colaboradora.senha)
  
      if (!senhaValida) {
        res.status(403).send('Senha não é válida')
      }
      
      const token = jwt.sign({email: req.body.email}, SECRET)
       return res.status(200).send(token)
    })
    
  }
    
  module.exports = {
    create,
    getAll,
    deleteById,
    login
  }
  