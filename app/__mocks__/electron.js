module.exports = {
  app: {
    getPath: () => 'C:\\tmp\\mock_path',
  },
  shell: {
    openExternal: () => true,
  },
  remote: {
    shell: () => undefined,
    dialog: () => undefined,
  },
}
