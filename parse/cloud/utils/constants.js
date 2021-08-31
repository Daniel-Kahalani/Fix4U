const UserType = {
  RSP: 'rsp',
  CUSTOMER: 'customer',
};
Object.freeze(UserType);
module.exports.UserType = UserType;

const AppointmentStatus = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PENDING: 'pending',
};
Object.freeze(AppointmentStatus);
module.exports.AppointmentStatus = AppointmentStatus;

const AppointmentType = {
  PERSONAL: 'Personal',
  SUPPLIER: 'Supplier',
  CUSTOMER: 'Customer',
};
Object.freeze(AppointmentType);
module.exports.AppointmentType = AppointmentType;

module.exports.NUM_OF_SEARCH_RESULTS = 3;
