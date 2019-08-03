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

export const createLog = async ({maQRCode,nlActive},req) => {
    let maNV;
    let tenNV;
    try {
        maNV = req.session.user.userID;
        tenNV = req.session.user.profileName;
    } catch (error) {
        throw new Error('SESSION DENIE');
    }
    const arrQrCode = maQRCode.split('_');
    const loaiLog = 'SCAN_QRCODE';
    const maBarCode = arrQrCode[3];
    let maVatLieu = '';
    nlActive.forEach((item,idx) => {
        if(idx < nlActive.length-1){
            maVatLieu +=item+", "
        }
        else if(idx === nlActive.length -1){
            maVatLieu +=item+"."
        }
    })
    const newLog = new logInfoModel({
        maNV,
        tenNV,
        loaiLog,
        logContent: "Quét thành công: "+maVatLieu,
        maBarCode,
        maQRCode
    })
    const result = await newLog.save({});
    return result;
}