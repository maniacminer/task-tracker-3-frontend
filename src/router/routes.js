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
      path: '/i18n',
      name: 'i18n',
      component: () => import('@/views/I18n.vue'),
      presentetion: {
        description: 'Язык',
        navbar: Navbar.AUTH,
        icon: 'language',
        auth: Auth.AUTH
      }          
    },    
    {
      path: '/task',
      name: 'task',
      component: () => import('@/views/TaskList.vue'),
      presentetion: {
        description: 'Задачи',
        navbar: Navbar.NAV,
        icon: 'assignment',
      }
    },
    {
      path: '/task/:id',
      component: () => import('@/views/NewTask.vue'),
    },    
    {
        path: '/task-new',
        name: 'task-new',
        component: () => import('@/views/NewTask.vue'),
        // presentetion: {
        //     description: 'Новая задача',
        //     navbar: Navbar.NAV,
        //     icon: 'assignment',
        //   }        
    },    
    {
      path: '/project',
      name: 'project',
      component: () => import('@/views/ProjectList.vue'),
      presentetion: {
          description: 'Проекты',
          navbar: Navbar.NAV,
          icon: 'work',
      },
    },
    {
      path: '/project/:id',
      component: () => import('@/views/Project.vue'),
    },      
    {
      path: '/project-new',
      name: 'project-new',
      component: () => import('@/views/Project.vue'),

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

