module.exports = {
  app: {
    getPath: () => {
      return 'C:\\tmp\\mock_path'
    }
  },
  shell: {
    openExternal: (url) => {
      return true
    }
  }
}
