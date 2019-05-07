import { apiUrl } from './proxy';

export const loginProps = {
    formControls: {
      username: {
        label:'Username',
        value: '',
        type: 'text',
        required: true
      },
      password: {
        label: 'Password',
        value: '',
        type: 'password',
        required: true
      }
    },
    error: {
      message: null
    },
    postUrl: apiUrl+'/users/authenticate',
    registerMode: false
  };
  
export const registerProps = {
    formControls: {
      firstName: {
        label:'First Name',
        value: '',
        type: 'text'
      },
      lastName: {
        label:'Last Name',
        value: '',
        type: 'text'
      },
      username: {
        label:'Username',
        value: '',
        type: 'text',
        required: true
      },
      password: {
        label: 'Password',
        value: '',
        type: 'password',
        required: true
      }
    },
    error: {
      message: null
    },
    postUrl: apiUrl+'/users/register',
    registerMode: true
  };
  