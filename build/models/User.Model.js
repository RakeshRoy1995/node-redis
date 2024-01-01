"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    provider: { type: String, default: "ekshop" },
    phone: { type: String },
    phone_verified: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    email: { type: String },
    email_verified: { type: Boolean, default: false },
    name: { type: String },
    password: { type: String },
    salt: { type: String },
    role_ids: { type: Array, default: [] },
    roles: [
        {
            id: { type: String, ref: 'role_list' },
            name: { type: String }
        }
    ],
    type: { type: String },
    profile_picture: { type: String },
    gender: { type: String, lowercase: true },
    birthdate: { type: Date },
    deleted: { type: Boolean, Default: false },
    deletedBy: { type: String, Default: null },
    deletedAt: { type: Date },
    country: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    division: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    district: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    upazila: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    union: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    province: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    state: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    city: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    area: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location' },
    country_info: { type: mongoose_1.Schema.Types.Mixed },
    division_info: { type: mongoose_1.Schema.Types.Mixed },
    district_info: { type: mongoose_1.Schema.Types.Mixed },
    upazila_info: { type: mongoose_1.Schema.Types.Mixed },
    union_info: { type: mongoose_1.Schema.Types.Mixed },
    province_info: { type: mongoose_1.Schema.Types.Mixed },
    state_info: { type: mongoose_1.Schema.Types.Mixed },
    city_info: { type: mongoose_1.Schema.Types.Mixed },
    area_info: { type: mongoose_1.Schema.Types.Mixed },
    total_order: { type: Number, default: 0 },
    total_pending_order: { type: Number, default: 0 },
    total_delivered_order: { type: Number, default: 0 },
    total_canceled_order: { type: Number, default: 0 },
    postcode: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    verification_token: { type: String, select: false },
    two_factor_auth: { type: Boolean },
    last_login: { type: Date },
    language: { type: String, default: 'en' },
    settings: { type: mongoose_1.Schema.Types.Mixed },
    login_info: [{ type: mongoose_1.Schema.Types.Mixed }],
    profile_status: { type: String, default: "Need Verification" },
    declined_reason: { type: String },
    profile_in_verification_fields: [
        {
            field_name: { type: String },
            status: { type: Boolean },
            previousValue: { type: String }
        }
    ],
    profile_completion_status: { type: String },
    status: { type: Number, default: 1 },
    is_customer: { type: Boolean, default: true },
    is_merchant: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
    total_wallet_point: { type: Number, default: 0 },
    muktopath_user: { type: Boolean, default: false },
    access_token: { type: String },
}, { timestamps: true });
userSchema.set('autoIndex', false);
userSchema.index({ name: 1, email: 1, phone: 1, gender: 1, country: 1, division: 1, district: 1, upazila: 1, union: 1, province: 1, state: 1, city: 1, area: 1, is_merchant: 1, is_customer: 1, type: 1 });
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
