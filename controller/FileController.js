const Filecontroller = {
    storeFile: (req, res) => {
        const {filename} = req.file;

        // FileService.storeFile(filename);
        
        res.json({
            url: `localhost:3000/uploads/${filename}`
        });
    }
}

module.exports = Filecontroller;