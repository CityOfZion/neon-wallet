// overrideStyles for notifications
const defaultWidth = 600
const marginLeft = -(defaultWidth / 2)

const overrideStyles = {
  Containers: {
    DefaultStyle: {
      width: defaultWidth,
      padding: 0
    },
    tc: {
      marginLeft
    },
    bc: {
      marginLeft
    }
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
      borderRadius: '4px',
      color: '#FFF'
    },

    success: {
      backgroundColor: '#5ABF6B',
      color: '#FFF'
    },
    error: {
      backgroundColor: '#EE6D66'
    },
    warning: {
      backgroundColor: '#FFCF48',
      color: '#000000'
    },
    info: {
      backgroundColor: '#FFCF48',
      color: '#000000'
    }
  },

  Title: {
    DefaultStyle: {
      display: 'none'
    }
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
      opacity: '0.8'
    }
  }
}
export default overrideStyles
