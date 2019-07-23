import mongoose from 'mongoose';

const qrCodeSchema = mongoose.Schema({
    roleMaSx: {type: String, required:true},
    maDonHang:{type: String},
    maSanPham:{type: String},
    maBarCode: {type: String, required:true,unique:true},
    maQRCode: {type: String, required:true},
    createTime: {type: Date, default: Date.now},
})
export const qrCodeModel = mongoose.model('qrcode_infos',qrCodeSchema);