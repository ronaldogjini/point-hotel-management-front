function auth({next, router}) {
  if (!localStorage.getItem('token'))   {
      return router.push({name: 'Login'})
  }
  return next();
}

function guest({next, router}) {
  if (localStorage.getItem('token'))   {
      return router.push({name: 'Mainpage'})
  }
  return next();
}

export default {
    auth,
    guest
}