import mongoose from 'mongoose';

const logInfoSchema = mongoose.Schema({
    maNV: {type: mongoose.Schema.Types.ObjectId, ref:'user_infos'},
    tenNV: {type: String},
    loaiLog: {type: String, required:true},
    maBarCode:{type: String},
    maQRCode:{type: String},
    logContent: {type: String, required:true},
    createTime: {type: Date, default: Date.now},
})
export const logInfoModel = mongoose.model('log_infos',logInfoSchema);