export const DUMMY_CREDENTIALS = {
    email: 'admin@lumixpert.de',
    password: 'secure123'
}

export function loginAdmin(email, password) {
    if (
        email === DUMMY_CREDENTIALS.email &&
        password === DUMMY_CREDENTIALS.password
    ) {
        localStorage.setItem('admin-auth', 'true')
        return true
    }
    return false
}

export function isAdminLoggedIn() {
    return typeof window !== 'undefined' && localStorage.getItem('admin-auth') === 'true'
}

export function logoutAdmin() {
    localStorage.removeItem('admin-auth')
}
