var css = require('./flat-theme.css');

// media breakpoint - small screen min width
var smallScreenMin = 768;

// default className for NotificationsSystem component
var notificationsSystemClassName = css['notifications-system'];

// default className for NotificationsContainer component
var notificationsContainerClassName = {
  main: css['notifications-container'],
  position: function position(_position) {
    return css['notifications-container--' + _position];
  }
};

// default transition for Notification component
var notificationsContainerTransition = {
  appearTimeout: 500,
  enterTimeout: 500,
  leaveTimeout: 500,
  name: {
    appear: css['notification-appear'],
    appearActive: css['notification-appear-active'],
    enter: css['notification-enter'],
    enterActive: css['notification-enter-active'],
    leave: css['notification-leave'],
    leaveActive: css['notification-leave-active']
  }
};

// default className for Notification component
var notificationClassName = {
  main: css['notification'],
  meta: css['notification-meta'],
  title: css['notification-title'],
  message: css['notification-message'],
  // `fa` corresponds to font-awesome's class name
  icon: 'fa ' + css['notification-icon'],
  imageContainer: css['notification-image-container'],
  image: css['notification-image'],
  status: function status(_status) {
    return css['notification--' + _status];
  },
  dismissible: css['notification--dismissible'],
  buttons: function buttons(count) {
    if (count === 0) {
      return '';
    } else if (count === 1) {
      return css['notification--buttons-1'];
    } else if (count === 2) {
      return css['notification--buttons-2'];
    }
    return css['notification-buttons'];
  },
  closeButtonContainer: css['notification-close-button-container'],
  closeButton: 'fa ' + css['notification-close-button'],
  button: css['notification-button'],
  buttonText: css['notification-button-text']
};

module.exports = {
  smallScreenMin: smallScreenMin,
  notificationsSystem: {
    className: notificationsSystemClassName
  },
  notificationsContainer: {
    className: notificationsContainerClassName,
    transition: notificationsContainerTransition
  },
  notification: {
    className: notificationClassName
  }
};