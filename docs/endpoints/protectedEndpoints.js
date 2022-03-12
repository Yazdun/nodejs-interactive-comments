const protectedEndpoints = [
  {
    method: 'get',
    endpoint: '/protected/user/',
    title: 'get user info',
  },
  {
    method: 'patch',
    endpoint: '/protected/user/update',
    title: 'update user info',
  },
  {
    method: 'post',
    endpoint: '/protected/comment/create',
    title: 'create comment',
  },
  {
    method: 'delete',
    endpoint: '/protected//commentdelete/:id',
    title: 'delete comment',
  },
  {
    method: 'patch',
    endpoint: '/protected/comment/update/:id',
    title: 'update comment',
  },
  {
    method: 'patch',
    endpoint: '/protected/comment/upvote/:id',
    title: 'upvote comment',
  },
  {
    method: 'patch',
    endpoint: '/protected/downvote/:id',
    title: 'downvote comment',
  },
  {
    method: 'patch',
    endpoint: '/protected/reply/:id',
    title: 'reply to a comment',
  },
]
