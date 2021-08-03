const CadastroService = require("../services/CadastroService");

const landingPageController = {
    landingPage: async (req, res) => {
        const  listaTodas = await CadastroService.listarPreferencias( )
        res.render('landingPage', { preferencias : listaTodas })
    },
    create: async (req, res) => {
        const {
            nome,
            email,  
            telefone,
            senha,
            data_nascimento
        } = req.body

        const cliente = await CadastroService.criaUsuario(
            nome,
            email,  
            telefone,
            senha,
            data_nascimento
        )
        return res.json({
            nome: cliente.nome, 
            email: cliente.email,
            data_nascimento: cliente.data_nascimento
        })
    }
}

module.exports = landingPageController