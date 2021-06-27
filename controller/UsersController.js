// const fs = require('fs');
// const path = require("path");
// const listaDeCadastro = path.join(__dirname,'../listaDeCadastro.json');
const UserService = require('../services/UserService');
const bcryptjs = require('bcryptjs');

const UsersController = {
    index: (req, res) =>{ 
        res.render('usersPage', { usuario: req.session.usuario })
    },
    
    login: (req, res) => {
        res.render('telaLogin');
    },

    logon: async (req, res) => {
        let { email, senha } = req.body;

        const cliente = await UserService.getEmail(email);
        console.log(cliente)
        if(cliente === null) return res.send('Usuário inválido')
        console.log(cliente.senha);
        const checkSenha = await bcryptjs.compare(senha, cliente.senha_hash)
        console.log(checkSenha);

        if(!checkSenha) return res.send('Senha inválida')

        
        // fs.readFile(listaDeCadastro, 'utf-8', (err, cadastroJson) => {
        //     if(err) throw err;
            
        //     arrayUsuario = JSON.parse(cadastroJson);
            
        //     let indexEmail = arrayUsuario.findIndex( usuario => usuario.email == email)
        //     let indexSenha = arrayUsuario.findIndex(usuario => bcryptjs.compareSync(senha, usuario.senha));
               
        //     if(indexEmail == -1) return res.send('Usuario invalido!');
        //     if(indexSenha == -1) return res.status(401).send('não autorizado');
            
            // return res.send('ok')
            req.session.usuario = cliente
            return res.redirect("/users")
        }
}

module.exports = UsersController;