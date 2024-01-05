// component
import SvgColor from '../../../Components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const navUserConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Articles',
    path: '/dashboard/articles',
    icon: icon('ic_article'),
  },
  {
    title: 'Events',
    path: '/dashboard/events',
    icon: icon('ic_events'),
  },
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: icon('ic_project'),
  },
  {
    title: 'Organizations',
    path: '/dashboard/organization',
    icon: icon('ic_organization'),
  },
  {
    title: 'Paid Organizations',
    path: '/dashboard/paid-organization',
    icon: icon('ic_orgMember'),
  },
  {
    title: 'Change Password',
    path: '/dashboard/change_password',
    icon: icon('ic_forms'),
  },
];

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Articles',
    path: '/dashboard/articles',
    icon: icon('ic_article'),
  },
  {
    title: 'Marketplace',
    path: '/dashboard/marketplace',
    icon: icon('ic_article'),
  },
  {
    title: 'Events',
    path: '/dashboard/events',
    icon: icon('ic_events'),
  },
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: icon('ic_project'),
  },
  {
    title: 'Education',
    path: '/dashboard/education',
    icon: icon('ic_project'),
  },
  {
    title: 'Payments',
    path: '/dashboard/payment',
    icon: icon('ic_invoice'),
  },
  {
    title: 'Peoples',
    path: '/dashboard/people',
    icon: icon('ic_people'),
  },
  {
    title: 'Organizations',
    path: '/dashboard/organization',
    icon: icon('ic_organization'),
  },
  {
    title: 'Paid Organizations',
    path: '/dashboard/paid-organization',
    icon: icon('ic_orgMember'),
  },
  {
    title: 'Change Password',
    path: '/dashboard/change_password',
    icon: icon('ic_forms'),
  },
];

export default navConfig;
