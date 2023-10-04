const db = require("../models");
const Perizinan= db.perizinan;

exports.create = (req,res) =>{
    const perizinan ={
        id_perizinan:req.body.id_perizinan,
        nama_perizinan:req.body.nama_perizinan,
        alasan:req.body.alasan,
        surat:req.body.surat,
        jenis:req.body.jenis,
        status:req.body.status,
        keterangan:req.body.keterangan,
        tanggal_awal:req.body.tanggal_awal,
        tanggal_akbir:req.body.tanggal_akhir
    }

    if(!req.body.id_perizinan){
        res.status(400).send({
            message:"id_Perizinan cannot be empty!"
        });
        return;
    }else if(!req.body.nama_perizinan){
        res.status(400).send({
            message:"nama_perizinan cannot be empty!"
        });
        return;
    }else if(!req.body.alasan){
        res.status(400).send({
            message:"alasan cannot be empty!"
        });
        return;
    }else if(!req.body.surat){
        res.status(400).send({
            message:"surat cannot be empty!"
        });
        return;
    }else if(!req.body.jenis){
        res.status(400).send({
            message:"jenis cannot be empty!"
        });
        return;
    }else if(!req.body.status){
        res.status(400).send({
            status:"surat cannot be empty!"
        });
        return;
    }else if(!req.body.keterangan){
        res.status(400).send({
            message:"keterangan cannot be empty!"
        });
        return;
    }else if(!req.body.tanggal_awal){
        res.status(400).send({
            message:"tanggal_awal cannot be empty!"
        });
        return;
    }else if(!req.body.tanggal_akhir){
        res.status(400).send({
            message:"tanggal_akhir cannot be empty!"
        });
        return;
    }

    Perizinan.create(perizinan)
        .then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating Perizinan",
            })
        })
};

exports.findAll = (req, res) => {
    Perizinan.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Perizinan.",
        });
      });
  };


  exports.update = (req, res) => {
    const id = req.params.id;
  
    Perizinan.update(req.body, {
      where: { id_perizinan: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Perizinan was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Perizinan with id=${id}. Maybe Perizinan was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Mahasiswa with id=" + id,
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Perizinan.destroy({
      where: { id_perizinan: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Perizinan was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Perizinan with id=${id}. Maybe Perizinan was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not Perizinan with id=" + id,
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Perizinan.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Perizinan with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Perizinan with id=" + id,
        });
      });
  };