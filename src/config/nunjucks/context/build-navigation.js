function buildNavigation(request) {
  return [
    {
      text: 'Home',
      url: '/',
      isActive: request.path === '/'
    },
    {
      text: 'Q&A',
      url: '/qa',
      isActive: request.path === '/qa'
    },
    {
      text: 'Upload Feedback',
      url: '/upload-feedback',
      isActive: request.path === '/upload-feedback'
    }
  ]
}

export { buildNavigation }
