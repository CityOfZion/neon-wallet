// overrideStyles for notifications
const defaultWidth = 480
const marginLeft = -(defaultWidth / 2)

const overrideStyles = {
  Containers: {
    DefaultStyle: {
      width: defaultWidth
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
      height: '70px',
      marginTop: 0,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '60px',
      color: '#FFF'
    },

    success: {
      backgroundColor: '#2E463D',
      color: '#66ED87'
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
      top: '27px',
      right: '25px',
      height: '22px',
      width: '22px',
      fontSize: '25px',
      fontWeight: 200,
      backgroundColor: 'none',
      opacity: '0.75'
    }
  }
}
export default overrideStyles
