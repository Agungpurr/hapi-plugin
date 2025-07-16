const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  NIM: {
    type: Number,
    required: true,
  },
  namaLengkap: {
    type: String,
    required: true,
  },
  namaJurusan: {
    type: String,
    enum: {
      values: ["Teknik Informatika", "Sistem Informasi", "Teknik Komputer"],
    },
  },
  namaHimpunan: {
    type: [String],
    enum: {
      values: ["HIMATIF", "HIMSI", "LDK", "RADIO KAMPUS", "TAEKWONDO"],
    },
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("users", userSchema);
