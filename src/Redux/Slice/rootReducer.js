/* eslint-disable import/no-unresolved */
import user from './user';
import messages from './messages';
import list from './list';
import accounts from './accounts';
import events from './events';
import articales from './articales';
import invoice from './invoice';
import organization from './organization';
import membership from './membership';
import eventAgenda from './eventAgenda';
import users from './users';
import projects from './projects';
import orgMembership from './orgMembership';
import sponsership from './sponsership';
import market from './marketPlaceSlice';
import organizationMember from './organizationMemberSlice'
import eventRegistered from './eventRegisteredUser'
import members from './memberSlice';
// import MemberServices from '../api/Members';
import home from './home';
import education from './educationSlice';

const rootReducer = {
  user,
  messages,
  list,
  accounts,
  events,
  articales,
  invoice,
  organization,
  membership,
  eventAgenda,
  users,
  projects,
  orgMembership,
  sponsership,
  market,
  organizationMember,
  eventRegistered,
  members,
  home,
  education
};

export default rootReducer;
