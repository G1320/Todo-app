import { storageService } from "./storage.service.js"

const KEY = 'loggedinUser'
export const userService = {
    login,
    getLoggedinUser,
    updateBalance,
    addOrder,
    toggleOrderStatus,
}
function login() {
    const user = { fullName: 'Baba', balance: 20, orders: [] }
    storageService.store(KEY, user)
    return user
}
function getLoggedinUser() {
    return storageService.load(KEY) || login()
}
function updateBalance(amount) {
    const user = storageService.load(KEY)
    user.balance += amount
    storageService.store(KEY, user)
}
function addOrder(order) {
    const user = storageService.load(KEY)
    user.orders.push(order)
    user.balance -= order.total
    storageService.store(KEY, user)
}
function toggleOrderStatus(orderId) {
    const user = storageService.load(KEY)
    const order = user.orders.find(order => order._id === orderId)
    order.status = order.status === 'pending' ? 'approved' : 'pending'
    storageService.store(KEY, user)
}
