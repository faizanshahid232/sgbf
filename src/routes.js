/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './Pages/UserPage';
import DashboardAppPage from './Pages/DashboardAppPage';
import Home from './src/Pages/Home';
import Profile from './Pages/Profile';
import DashboardPeople from './Pages/DashboardPeople';
import EventsAgenda from './Pages/EventsAgenda';
import Invoice from './Pages/Invoice';
import DashboardProjects from './Pages/DashboardProjects';
import Layout from './src/Utils/Layout';
import About from './src/Pages/About';
import TermPage from './src/Pages/TermPage';
import SignIn from './src/Pages/Auth/SignIn';
import Register from './src/Pages/Auth/Register';
import MemberShipPage from './src/Pages/MemberShip/MemberShipPage';
import Events from './src/Pages/Events';
import People from './src/Pages/People';
import Article from './src/Pages/Article';
import NewArtical from './Components/articales/NewArtical';
import EditArtical from './Components/articales/EditArtical';
import EventsPage from './Pages/Events';
import NewEvent from './Components/events/NewEvent';
import Organization from './Pages/Organization';
import NewOrganization from './Components/organization/NewOrganization';
import EditOrganization from './Components/organization/EditOrganization';
import NewEventagenda from './Components/eventAgenda/NewEventagenda';
import EditEventAgenda from './Components/eventAgenda/EditEventAgenda';
import AddInvoice from './Components/Invoices/AddInvoice';
import UpdateInvoice from './Components/Invoices/UpdateInvoice';
import AddProjects from './Components/Projects/AddProjects';
import UpdateProjects from './Components/Projects/UpdateProjects';
import Projects from './src/Pages/Projects';
import OrganizationMembership from './Pages/OrganizationMembership';
import NewOrganizationMembership from './Components/organizationMembership/NewOrganizationMembership';
import EditOrganizationMembership from './Components/organizationMembership/EditOrganizationMembership';
import Sponsership from './Pages/Sponsership';
import NewSponsership from './Components/sponsership/NewSponsership';
import EditSponsership from './Components/sponsership/EditSponsership';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import ProjectDetails from './src/Pages/ProjectDetails';
import EventDetails from './src/Pages/EventDetails';
import PeopleDetails from './src/Pages/PeopleDetails';
import ArticleDetails from './src/Pages/ArticleDetails';
import CardPage from './Pages/CardPage';
import ArticalDetailPage from './Components/articales/ArticalDetailPage';
import EventDetailPage from './Components/events/EventDetailPage';
import PeopleDetailPage from './Components/people/PeopleDetailPage';
import EventAgendaDetail from './Components/eventAgenda/EventAgendaDetail';
import ProjectDetailPage from './Components/Projects/ProjectDetailPage';
import InvoiceDetailPage from './Components/Invoices/InvoiceDetailPage';
import OrganizationDetailPage from './Components/organization/OrganizationDetailPage';
import OrganizationMembershipDetailPage from './Components/organizationMembership/OrganizationMembershipDetailPage';
import SponsershipDetailPage from './Components/sponsership/SponsershipDetailPage';
import ResetPassword from './src/Pages/Auth/ResetPassword';
import ForgetPasswordPage from './src/Pages/Auth/ForgetPasswordPage';
import ProfileCard from './Components/UI/Card/ProfileCard';
import MemberPage from './Pages/MemberPage';
import MarketPlacePage from './Pages/MarketPlacePage';
import MarketPlaceDetail from './Components/marketplace/MarketPlaceDetail';
import EditMarketplace from './Components/marketplace/EditMarketplace';
import NewMarketplace from './Components/marketplace/NewMarketplace';
import CreatePeople from './Components/people/CreatePeople';
import EditPeople from './Components/people/EditPeople';
import CreateOrganizationMember from './Components/organizationMember.js/CreateOrganizationMember';
import EditOrganizationMember from './Components/organizationMember.js/EditOrganizationMember';
import OrgranizationPayment from './Pages/OrgranizationPayment';
import AppliedEventPage from './Pages/AppliedEventPage';
import PaymentPage from './Pages/PaymentPage';
import PaymentConfirmation from './Pages/PaymentConfirmation';
import EditEvent from './Components/editEvent/EditEvent';
import MarketPlace from './src/Pages/MarketPlace';
import MarketDetails from './src/Pages/MarketDetails';
import EducationPage from './Pages/EducationPage';
import EducationDetail from './Components/education/EducationDetail';
import AddEducation from './Components/education/AddEducation';
import EditEducation from './Components/education/EditEducation';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'paymentConfirmation', element: <PaymentConfirmation /> },
        { path: 'about', element: <About /> },
        { path: 'terms', element: <TermPage /> },
        { path: 'sign_in', element: <SignIn /> },
        { path: 'user_profile/:id', element: <ProfileCard /> },
        { path: 'register', element: <Register /> },
        { path: 'membership', element: <MemberShipPage /> },
        { path: 'events', element: <Events /> },
        { path: 'directory/people', element: <People /> },
        { path: 'forgot-password', element: <ForgetPasswordPage /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'project-details/:id', element: <ProjectDetails /> },
        { path: 'event-agenda/:id', element: <EventDetails /> },
        { path: 'members-info/:id', element: <PeopleDetails /> },
        { path: 'market-info/:id', element: <MarketDetails /> },
        { path: 'article-details/:id', element: <ArticleDetails /> },
        { path: 'articles', element: <Article /> },
        { path: 'projects', element: <Projects /> },
        { path: 'market-place', element: <MarketPlace /> },

        // { path: 'directory/people', element: <People /> },
        { path: 'payment/user', element: <PaymentPage /> },
        { path: 'payment/organization/:id', element: <OrgranizationPayment /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'profile', element: <Profile /> },
        { path: 'card', element: <CardPage /> },
        { path: 'articles', element: <UserPage /> },
        { path: 'articles/newarticales', element: <NewArtical /> },
        { path: 'articles/editarticales', element: <EditArtical /> },
        { path: 'articles_details/:id', element: <ArticalDetailPage /> },
        { path: 'invoice/add_invoice', element: <AddInvoice /> },
        { path: 'invoice/edit_invoice', element: <UpdateInvoice /> },
        { path: 'projects/add_projects', element: <AddProjects /> },
        { path: 'projects/edit_projects', element: <UpdateProjects /> },
        { path: 'change_password', element: <ChangePasswordPage /> },
        { path: 'events', element: <EventsPage /> },
        { path: 'events/registered/:id', element: <AppliedEventPage /> },
        { path: 'event_details/:id', element: <EventDetailPage /> },
        { path: 'events/newevent', element: <NewEvent /> },
        { path: 'events/editevent', element: <EditEvent /> },
        { path: 'people', element: <DashboardPeople /> },
        { path: 'people_details/:id', element: <PeopleDetailPage /> },
        { path: 'people/edit-people', element: <EditPeople /> },
        { path: 'people/new-people', element: <CreatePeople /> },
        { path: 'projects', element: <DashboardProjects /> },
        { path: 'projects_details/:id', element: <ProjectDetailPage /> },
        { path: 'sponsership', element: <Sponsership /> },
        { path: 'sponsership_details/:id', element: <SponsershipDetailPage /> },
        { path: 'sponsership/newSponsership', element: <NewSponsership /> },
        { path: 'sponsership/editSponsership', element: <EditSponsership /> },
        { path: 'paid-organization', element: <OrganizationMembership /> },
        { path: 'paid-organization_details/:id', element: <OrganizationMembershipDetailPage /> },
        { path: 'paid-organization/newpaid-organization', element: <NewOrganizationMembership /> },
        { path: 'paid-organization/editpaid-organization', element: <EditOrganizationMembership /> },
        { path: 'organization', element: <Organization /> },
        { path: 'organization_details/:id', element: <OrganizationDetailPage /> },
        { path: 'organization/neworganization', element: <NewOrganization /> },
        { path: 'organization/editorganization', element: <EditOrganization /> },
        { path: 'payment', element: <Invoice /> },
        { path: 'members/:id', element: <MemberPage /> },
        { path: 'members/edit-members/:id', element: <EditOrganizationMember /> },
        { path: 'members/new-members/:id', element: <CreateOrganizationMember /> },
        { path: 'invoice_details/:id', element: <InvoiceDetailPage /> },
        { path: 'events-agenda', element: <EventsAgenda /> },
        { path: 'events_agenda_details/:id', element: <EventAgendaDetail /> },
        { path: 'events-agenda/new-eventagenda', element: <NewEventagenda /> },
        { path: 'events-agenda/edit-eventagenda', element: <EditEventAgenda /> },
        { path: 'marketplace', element: <MarketPlacePage /> },
        { path: 'marketplace_details/:id', element: <MarketPlaceDetail /> },
        { path: 'marketplace/edit-marketplace', element: <EditMarketplace /> },
        { path: 'marketplace/new-marketplace', element: <NewMarketplace /> },
        { path: 'education', element: <EducationPage /> },
        { path: 'education_details/:id', element: <EducationDetail /> },
        { path: 'education/edit-education', element: <EditEducation /> },
        { path: 'education/add-education', element: <AddEducation /> },
      ],
    },

    {
      path: 'login',
      // element: <Login />,
    },
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" />, index: true },
        // { path: '404', element: <Page404 /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      // path: '*',
      // element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
