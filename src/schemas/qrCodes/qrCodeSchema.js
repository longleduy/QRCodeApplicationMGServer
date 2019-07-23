import { gql } from 'apollo-server-express';
import {
    taoLenhSx,
    filterQRCode,
    getQRCodeInfo
} from '../../controllers/qrCodes/qrCodeController';
//Todo: Utils
import { convertPostTime } from '../../utils/dateTimeUtil';
export const typeDefs = gql`
    input lenhSxData {
        roleMaSx: Int!,
        maDonHang: String
        maSanPham: String
        maBarCode: String!
        maQRCode: String!
    }
    type QRCodeInfo{
        qrCodeID: String!
        roleMaSx: String!
        maDonHang: String
        maSanPham: String
        maBarCode: String!
        maQRCode: String!
        createTime: String!
    }
    extend type Query {
        filterQRCode(filterKey: String): [QRCodeInfo]
        getQRCodeInfo(qrCodeID: String):QRCodeInfo
    }
    extend type Mutation {
        taoLenhSx(lenhSxData: lenhSxData): DefaultRespone
    }
`;
export const resolvers = {
    Query: {
        filterQRCode: async (obj, { filterKey }, context) => {
            let result = await filterQRCode(filterKey);
            return result
        },
        getQRCodeInfo: async (obj, { qrCodeID }, context) => {
            let result = await getQRCodeInfo(qrCodeID);
            return result
        },
    },
    Mutation: {
        taoLenhSx: async (obj, {lenhSxData}, { req }) => {
            let result = await taoLenhSx(lenhSxData,req);
            return result;
        },
    }, 
    QRCodeInfo:{
        qrCodeID: async ({ id }) => {
            return id;
        },
        createTime: async ({ createTime }) => {
            return convertPostTime(createTime);
        },
    }
}