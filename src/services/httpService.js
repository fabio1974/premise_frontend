import axios from "axios";
import {toast} from "react-toastify";


axios.interceptors.response.use(null, error => {
    console.log('INTERCEPTOR CALLING ', error.response)
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500

    if (!expectedError) {
        toast.error('Generic unexpected error', error)
        console.log(error)
    }


    toast.error('Generic Expected error', error)

    return Promise.reject(error);  //<= pass control do any catch block
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put
}
