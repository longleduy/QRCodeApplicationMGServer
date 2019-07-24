import { mongo } from 'mongoose';
import { qrCodeModel } from '../../models/qrCodeModel';
import { ERROR } from '../../utils/constains/mainContain';

//Todo: Tao lenh Sx 
export const taoLenhSx = async ({ roleMaSx, maDonHang, maSanPham, maBarCode, maQRCode }) => {
    const qrCodeInfo = new qrCodeModel({
        roleMaSx,
        maDonHang,
        maSanPham,
        maBarCode,
        maQRCode
    })
    const result = await qrCodeInfo.save();
    if (result) return { isSuccess: true };
    return { isSuccess: false, message: 'SERVER ERROR' };
}
export const filterQRCode = async (filterKey) => {
    const roleFilter = filterKey.split(':')[0];
    const filterData = filterKey.split(':')[1];
    let roleDB = null;
    switch (roleFilter) {
        case 'D':
            roleDB = 'maDonHang';
            break;
        case 'S':
            roleDB = 'maSanPham';
            break;
        default:
            roleDB = 'maBarCode';
    }
    const result = qrCodeModel.find({ [roleDB]: { $regex: filterData, $options: 'i' } }).sort({ _id: -1 }).limit(5);
    return result;
}
export const getQRCodeInfo = async (qrCodeID) => {
    let _id = mongo.ObjectId(qrCodeID);
    const result = qrCodeModel.findOne({ _id });
    return result;
}
