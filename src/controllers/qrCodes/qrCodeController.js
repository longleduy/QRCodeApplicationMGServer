import { mongo } from 'mongoose';
import { qrCodeModel } from '../../models/qrCodeModel';
import {logInfoModel} from '../../models/logInfoModel';
import { ERROR } from '../../utils/constains/mainContain';

//Todo: Tao lenh Sx 
export const taoLenhSx = async ({ roleMaSx, maDonHang, maSanPham, maBarCode, maQRCode },req) => {
    let maNV = req.session.user.userID;
    let tenNV = req.session.user.profileName;
    const qrCodeInfo = new qrCodeModel({
        maNV,
        tenNV,
        roleMaSx,
        maDonHang,
        maSanPham,
        maBarCode,
        maQRCode
    })
    const result = await qrCodeInfo.save();
    await createLog(maNV,tenNV,'CREATE_QRCODE','Tạo lệnh sản xuất',maBarCode,maQRCode);
    if (result) return { isSuccess: true };
    return { isSuccess: false, message: 'SERVER ERROR' };
}
//Todo:Filter theo maDonHang, maSanPham, maBarCode
export const filterQRCode = async (filterKey) => {
    const roleFilter = filterKey.charAt(0);
    const filterText = filterKey.substr(1);
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
    const roleFilter = filterKey.charAt(0)
    const filterText = filterKey.substr(1);
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
export const createLog = async (maNV,tenNV,loaiLog,logContent,maBarCode = null,maQRCode) => {
    const newLog = new logInfoModel({
        maNV,
        tenNV,
        loaiLog,
        logContent,
        maBarCode,
        maQRCode
    })
    const result = await newLog.save({});
}
export const getQRCodeInfo = async (qrCodeID) => {
    let isQRCodeID = qrCodeID.indexOf('_') === -1 || false;
    let result = null;
    if(isQRCodeID){
        let _id = mongo.ObjectId(qrCodeID);
         result =await qrCodeModel.findOne({ _id }).populate('maNV','profileName avatar');
    }
    else{
        result =await qrCodeModel.findOne({ maQRCode:qrCodeID }).populate('maNV','profileName avatar');
    }
    return result;
}
