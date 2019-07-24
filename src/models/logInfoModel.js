import mongoose from 'mongoose';

const logInfoSchema = mongoose.Schema({
    maNV: {type: String, required:true},
    loaiLog: {type: String, required:true},
    maBarCode:{type: String},
    logContent: {type: String, required:true},
    createTime: {type: Date, default: Date.now},
})
export const logInfoModel = mongoose.model('log_infos',logInfoSchema);