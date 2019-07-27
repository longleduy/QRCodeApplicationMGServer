import { mongo } from 'mongoose';
import { logInfoModel } from '../../models/logInfoModel';
import { ERROR } from '../../utils/constains/mainContain';


//Todo:Filter theo maDonHang, maSanPham, maBarCode
export const filterLog = async ({ filterDH = '', filterSP = '', filterBarCode = '', filterNV = '', filterTime = '' }) => {
    const result = await logInfoModel
        .find({
            maBarCode: { $regex: filterBarCode, $options: 'i' },
            tenNV: { $regex: filterNV, $options: 'i' },
        })
        .populate('maNV', 'profileName avatar')
        .sort({ _id: -1 })
        .limit(6);
    return result;
}

export const getLogInfo = async (logID) => {
    let _id = mongo.ObjectId(logID);
    const result = await logInfoModel.findOne({ _id }).populate('maNV', 'profileName avatar');
    return result;
}

export const createLog = async (maQRCode,req) => {
    let maNV = req.session.user.userID;
    let tenNV = req.session.user.profileName;
    const arrQrCode = maQRCode.split('_');
    const loaiLog = 'SCAN_QRCODE';
    const maBarCode = arrQrCode[3];
    let maVatLieu = '';
    arrQrCode.forEach((item,idx) => {
        if(idx > 3 && idx < arrQrCode.length -1){
            maVatLieu +=item+"_"
        }
        else if(idx === arrQrCode.length -1){
            maVatLieu +=item
        }
    })
    const newLog = new logInfoModel({
        maNV,
        tenNV,
        loaiLog,
        logContent: "Scan thanh cong nguyen vat lieu: "+maVatLieu,
        maBarCode,
        maQRCode
    })
    const result = await newLog.save({});
    return result;
}