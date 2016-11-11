import { routeRegister } from 'steiner';

const register = new routeRegister({
    actionTranslations: {
        create: {
            it: 'crea',
            en: 'create'
        },
        list: {
            it: 'lista',
            en: 'list'
        }
    }
});

register.addStaticOptions([{
    type: 'link',
    path: '/profile',
    label: 'Profile'
}]);

export default register;