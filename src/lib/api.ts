import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

// Attach access token
api.interceptors.request.use(cfg => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) cfg.headers.Authorization = `Bearer ${token}`
  }
  return cfg
})

// Auto-refresh on 401
api.interceptors.response.use(
  res => res,
  async err => {
    const orig = err.config
    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true
      try {
        const refresh = localStorage.getItem('refresh_token')
        if (!refresh) throw new Error('No refresh token')
        const { data } = await axios.post(`${API_URL}/api/auth/token/refresh/`, { refresh })
        localStorage.setItem('access_token', data.access)
        orig.headers.Authorization = `Bearer ${data.access}`
        return api(orig)
      } catch {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        if (typeof window !== 'undefined') window.location.href = '/auth/login'
      }
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  register:       (d: any) => api.post('/api/auth/register/', d),
  login:          (d: any) => api.post('/api/auth/login/', d),
  logout:         (d: any) => api.post('/api/auth/logout/', d),
  profile:        ()       => api.get('/api/auth/profile/'),
  updateProfile:  (d: any) => api.patch('/api/auth/profile/', d),
  changePassword: (d: any) => api.post('/api/auth/change-password/', d),
  forgotPassword: (d: any) => api.post('/api/auth/forgot-password/', d),
  resetPassword:  (d: any) => api.post('/api/auth/reset-password/', d),
  contact:        (d: any) => api.post('/api/auth/contact/', d),
}

export const productsAPI = {
  list:         (p?: any)  => api.get('/api/products/', { params: p }),
  detail:       (slug: string) => api.get(`/api/products/${slug}/`),
  categories:   ()         => api.get('/api/products/categories/'),
  stats:        ()         => api.get('/api/products/stats/'),
  testimonials: (featured?: boolean) => api.get('/api/products/testimonials/', { params: featured ? { featured: true } : {} }),
  requestDemo:  (d: any)   => api.post('/api/products/demo-request/', d),
}

export const ordersAPI = {
  create:   (d: any)  => api.post('/api/orders/create/', d),
  verify:   (d: any)  => api.post('/api/orders/verify/', d),
  myOrders: ()        => api.get('/api/orders/my-orders/'),
  detail:   (id: string) => api.get(`/api/orders/${id}/`),
}

export const licensesAPI = {
  mine:       ()            => api.get('/api/licenses/my/'),
  detail:     (id: string)  => api.get(`/api/licenses/${id}/`),
  validate:   (d: any)      => api.post('/api/licenses/validate/', d),
  activations:(id: string)  => api.get(`/api/licenses/${id}/activations/`),
  deactivate: (id: string, d: any) => api.post(`/api/licenses/${id}/deactivate/`, d),
}

export const downloadsAPI = {
  history: () => api.get('/api/downloads/history/'),
  request: (d: any) => api.post('/api/downloads/request/', d),
}

export const adminAPI = {
  stats:          () => api.get('/api/products/admin/stats/'),
  createProduct:  (d: any) => api.post('/api/products/', d),
  updateProduct:  (id: string, d: any) => api.patch(`/api/products/${id}/`, d),
  deleteProduct:  (id: string) => api.delete(`/api/products/${id}/`),
  uploadInstaller:(slug: string, f: FormData) => api.post(`/api/products/${slug}/upload-installer/`, f, { headers: { 'Content-Type': 'multipart/form-data' } }),
  orders:         () => api.get('/api/orders/admin/'),
  users:          () => api.get('/api/auth/admin/users/'),
}

export default api
