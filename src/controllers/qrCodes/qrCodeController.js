import { mongo } from 'mongoose';
import { qrCodeModel } from '../../models/qrCodeModel';
import {logInfoModel} from '../../models/logInfoModel';
import { ERROR } from '../../utils/constains/mainContain';

//Todo: Tao lenh Sx 
export const taoLenhSx = async ({ roleMaSx, maDonHang, maSanPham, maBarCode, maQRCode },req) => {
    let maNV = req.session.user.email;
    const qrCodeInfo = new qrCodeModel({
        roleMaSx,
        maDonHang,
        maSanPham,
        maBarCode,
        maQRCode
    })
    const result = await qrCodeInfo.save();
    await createLog(maNV,'CREATE_QRCODE','Tạo lệnh sản xuất',maBarCode);
    if (result) return { isSuccess: true };
    return { isSuccess: false, message: 'SERVER ERROR' };
}
//Todo:Filter theo maDonHang, maSanPham, maBarCode
export const filterQRCode = async (filterKey) => {
    const roleFilter = filterKey.split(':')[0];
    const filterText = filterKey.split(':')[1];
    let filterField = null;
    switch (roleFilter) {
        case 'D':
            filterField = 'maDonHang';
            break;
        case 'S':
            filterField = 'maSanPham';
            break;
        default:
            filterField = 'maBarCode';
            break;
    }
    const result =await qrCodeModel.find({ [filterField]: { $regex: filterText, $options: 'i' } }).sort({ _id: -1 }).limit(5);
    return result;
}
export const filterDorS = async (filterKey) => {
    const roleFilter = filterKey.split(':')[0];
    const filterText = filterKey.split(':')[1];
    let filterField = null;
    switch (roleFilter) {
        case 'D':
            filterField = 'maDonHang';
            break;
        case 'S':
            filterField = 'maSanPham';
            break;
        default:
            filterField = 'maBarCode';
            break;
    }
    const result =await qrCodeModel.find({ [filterField]: { $regex: filterText, $options: 'i' } },{[filterField]:1}).sort({ _id: -1 }).limit(5);
    return result;
}
export const createLog = async (maNV,loaiLog,logContent,maBarCode = null) => {
    const newLog = new logInfoModel({
        maNV,
        loaiLog,
        logContent,
        maBarCode
    })
    const result = await newLog.save({});
}
export const getQRCodeInfo = async (qrCodeID) => {
    let _id = mongo.ObjectId(qrCodeID);
    const result = qrCodeModel.findOne({ _id });
    return result;
}
