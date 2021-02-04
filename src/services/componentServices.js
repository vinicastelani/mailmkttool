import Axios from "axios"
import Store from "../store/index"

export default{
    async getComponents(){
        const response = await Axios.get(Store.state.api + process.env.VUE_APP_SERVICE_COMPONENT)
        return response.data
    }
}