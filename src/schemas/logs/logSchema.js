import { gql } from 'apollo-server-express';
import {
    filterLog,
    getLogInfo,
    createLog
} from '../../controllers/logs/logController';
//Todo: Utils
import { convertPostTime } from '../../utils/dateTimeUtil';
export const typeDefs = gql`
    input filterOption {
        filterDH: String
        filterSP: String
        filterBarCode: String
        filterNV: String
        filterTime: String
    }
    type LogInFo{
        logID: String!
        loaiLog: String!
        logContent: String!
        maBarCode: String
        maQRCode: String
        createTime: String!
        nhanVien: UserInfo
    }
    extend type Query {
        filterLog(filterOption: filterOption): [LogInFo]
        getLogInfo(logID: String):LogInFo
    }
    extend type Mutation {
        createLog(maQRCode: String!):LogInFo
    }
`;
export const resolvers = {
    Query: {
        filterLog: async (obj, { filterOption }, context) => {
            let result = await filterLog(filterOption);
            return result
        },
        getLogInfo: async (obj, { logID }, context) => {
            let result = await getLogInfo(logID);
            return result
        },
    },
    Mutation: {
        createLog: async (obj, { maQRCode }, {req}) => {
            let result = await createLog(maQRCode,req);
            return result
        },
    },
    LogInFo:{
        logID: async ({ id }) => {
            return id;
        },
        createTime: async ({ createTime }) => {
            return convertPostTime(createTime);
        },
        nhanVien: async ({ maNV }) => {
            return {
                userID: maNV._id,
                profileName:maNV.profileName,
                avatar:maNV.avatar
            }
        }
    }
}