const userModel = require("../models/userModel");
const {
  tambahDataValidation,
  updateDataValidation,
} = require("../validation/userValidation");

// ? Tambah Data

const tambahData = async (req, res) => {
  const newUser = new userModel(req.body);

  // ? Validation
  const { error } = await tambahDataValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // ? cekNim
  const cekNIM = await userModel.findOne({ NIM: req.body.NIM });
  if (cekNIM) {
    return res.status(400).json({
      message: `NIM ${cekNIM.NIM} sudah terdaftar`,
    });
  }

  try {
    const response = await newUser.save();
    const data = response;
    res.status(201).json({
      message: "data dibawa ini berhasil dibuat",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

//  ? get All Data
const getData = async (req, res) => {
  const cekData = await userModel.find();
  if (cekData.length == 0) {
    return res.status(400).json({
      message: "data tidak ada!",
    });
  }
  try {
    const response = await userModel.find();
    const data = response;
    res.status(200).json({
      message: "Berikut ini adalah datanya!",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

// ? Get data by id
const getdataById = async (req, res) => {
  const ambilReqId = req.params.id;
  try {
    const response = await userModel.findById({ _id: ambilReqId });
    if (!response) {
      return res.status(400).json({
        message: "Data dengan id tersebut tidak terdaftar!",
      });
    }
    const data = response;
    res.status(200).json({
      message: "Berikut ini adalah datany",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

// ? Update Data
const updateData = async (req, res) => {
  const ambilReqId = req.params.id;

  // ? Validation
  const { error } = await updateDataValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const response = await userModel.findByIdAndUpdate(
      { _id: ambilReqId },
      { $set: req.body }
    );
    const dataSebelumnya = response;
    const dataSesudahnya = await userModel.findById({ _id: ambilReqId });
    res.status(201).json({
      message: "Data dibawah ini berhasil di ubah",
      dataSebelumnya,
      dataSesudahnya,
    });
  } catch (error) {
    console.log(error);
  }
};

// ? deleteData
const deleteData = async (req, res) => {
  const ambilReqId = req.params.id;

  try {
    const response = await userModel.findByIdAndDelete({ _id: ambilReqId });
    if (!response) {
      return res.status(400).json({
        message: "data dengan id tersebut tidak terdaftar!",
      });
    }
    const data = response;
    res.status(200).json({
      message: "Data Berhasil di hapus",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  tambahData,
  getData,
  getdataById,
  updateData,
  deleteData,
};
