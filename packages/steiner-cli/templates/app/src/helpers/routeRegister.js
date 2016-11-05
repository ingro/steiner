import { routeRegister } from 'steiner';

const register = new routeRegister();

register.addStaticOptions([{
    type: 'link',
    path: '/profile',
    label: 'Profile'
}]);

export default register;