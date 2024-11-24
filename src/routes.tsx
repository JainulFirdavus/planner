import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,MdAssignment,MdAvTimer
} from 'react-icons/md';

// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/data-tables';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />, 
  },
  {
    name: 'Worklist',
    layout: '/admin', 
    path: '/worklist',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    secondary: true,
    hasSubMenu: true,
    nestedItems: [
      {
        name: 'Todo',
        path: '/todos',
        icon:  <Icon as={MdAssignment} width="20px" height="20px" color="inherit" />,
      },
      {
        name: 'Reminder',
        path: '/reminders',
        icon:  <Icon as={MdAvTimer} width="20px" height="20px" color="inherit" />,
      },
    ],
  },
  {
    name: 'Settings',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/settings',
    // secondary: true,
    // nestedItems: [ { name: 'OverView', path: '/general', }, { name: 'Project 2', path: '/projects/2', }, ],
  },
  /* {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  }, */
];

export default routes;
