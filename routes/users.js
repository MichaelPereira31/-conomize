const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

require('../models/Users')
const User = mongoose.model('users')

//Rotas
    //Rota tela de Cadastro
        router.get('/registro',function(req,res){
            //Front-end
        })

    //Rota Validação de dados
        router.post('/resgitrar',function(req,res){
            if(req.body.nome == undefined || req.body.email == undefined || req.body.senha == undefined || req.body.nome == null || req.body.email == null || req.body.senha == null){
                //Erro nos dados inseridos
            }else{
                //Verificar se o email esta sendo utilizado
                User.findOne({email:req.body.email}).then(function(user){
                    if(usuario){
                        //E-mail já cadastrado no sistema
                    }else{
                        //Guardando Valores
                        const novoUser = {
                            nome:req.body.nome,
                            email: req.body.email,
                            senha: req.body.email
                        }

                        //Deixando a senha segura
                        bcrypt.genSalt(10,function(erro,salt){
                            bcrypt.hash(novoUser.senha,salt,function(erro,hash){
                                if(erro){
                                    //erro ao deixar senha mais segura
                                    //ir para tela inicial
                                }else{
                                    novoUser.senha = hash
                                    new User(novoUser).save().then(function(){
                                        //Usuario criado com sucesso
                                    }).catch(function(err){
                                        //Erro ao salvar novo usuário
                                    })
                                }

                            })
                        })
                    }
                }).catch(function(err){
                    //erro interno
                    //rota inicial
                })
            }
        })
