import Navbar from '@/enum/navbar'
import Auth from '@/enum/auth'

export default [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      presentetion: {
        description: 'На главную',
        navbar: Navbar.NAV,
        icon: 'home',
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      presentetion: {
        description: 'Мой профиль',
        navbar: Navbar.AUTH,
        icon: 'person',
        auth: Auth.AUTH
      }      
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/Signin.vue'),
      presentetion: {
        description: 'Вход',
        navbar: Navbar.AUTH,
        icon: 'email',
        auth: Auth.UNAUTH
      }        
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
      presentetion: {
        description: 'Регистрация',
        navbar: Navbar.AUTH,
        icon: 'how_to_reg',
        auth: Auth.UNAUTH
      }          
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/TaskList.vue'),
      presentetion: {
        description: 'Задачи',
        navbar: Navbar.NAV,
        icon: 'assignment',
      }
    },
    {
      path: '/about',
      name: 'about',
      description: 'Информация',
      component: () => import('@/views/About.vue'),
      presentetion: {
        description: 'Информация',
        navbar: Navbar.NAV,
        icon: 'info',
      }

    },    
  ]

