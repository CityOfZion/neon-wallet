// @flow

// overrideStyles for notifications
const defaultWidth = 600
const marginLeft = -(defaultWidth / 2)

const overrideStyles = (theme: string) => ({
  Containers: {
    DefaultStyle: {
      width: defaultWidth,
      padding: 0,
    },
    tc: {
      marginLeft,
    },
    bc: {
      marginLeft,
    },
  },

  NotificationItem: {
    DefaultStyle: {
      borderTop: 'none',
      height: '65px',
      marginTop: '10px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '60px',
      paddingRight: '50px',
      borderRadius: '4px',
      color: '#FFF',
    },

    success: {
      backgroundColor: theme === 'Dark' ? '#2B5148' : '#5ABF6B',
      color: theme === 'Dark' ? '#4CFFB3' : '#fff',
    },
    error: {
      backgroundColor: theme === 'Dark' ? '#6B3B7C' : '#EE6D66',
      color: theme === 'Dark' ? '#EB70FF' : '#fff',
    },
    warning: {
      backgroundColor: '#FFCF48',
      color: '#000000',
    },
    info: {
      backgroundColor: '#FFCF48',
      color: '#000000',
    },
  },

  Title: {
    DefaultStyle: {
      display: 'none',
    },
  },

  Dismiss: {
    DefaultStyle: {
      top: '25px',
      right: '25px',
      height: '22px',
      width: '22px',
      fontSize: '25px',
      fontWeight: 200,
      backgroundColor: 'none',
      opacity: '0.8',
    },
    success: {
      color: theme === 'Dark' ? '#4CFFB3' : '#fff',
      opacity: theme === 'Dark' ? 1 : 0.4,
    },
    warning: {
      color: '#000000',
      opacity: 0.4,
    },
    error: {
      color: theme === 'Dark' ? '#EB70FF' : '#fff',
      opacity: theme === 'Dark' ? 1 : 0.4,
    },
  },
})
export default overrideStyles
