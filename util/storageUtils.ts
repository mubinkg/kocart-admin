export function getUser(){
    const user = localStorage.getItem('user')
    return JSON.parse(user ? user : '')
}

export function getIsAdmin(){
    const user = getUser()
    return user?.isAdmin ? user.isAdmin : false
}