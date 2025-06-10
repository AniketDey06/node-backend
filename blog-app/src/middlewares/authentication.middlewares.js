import { validateUserToke } from "../services/auth.js"

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue) {
            next()
        }

        try {
            const userPayload = validateUserToke(tokenCookieValue)
            req.user = userPayload
            next()
        } catch (error) {
            console.log('Token validation failed:', error.message)
            req.user = null
            
        }
       
    }
}

export {
    checkForAuthenticationCookie
}