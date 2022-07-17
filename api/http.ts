import axios, {AxiosStatic} from "axios";

const DOMAIN = process.env.API_URL;

interface AxiosOption extends AxiosStatic{
    responseType: string|null,
    headers: any|null,
    method: string,
    url: string,
    data: any,
    options: any,
}
interface ApiOption {
    excel: boolean,
    multipart: boolean,
}

const request = (method: string, url: string, data = {}, option: ApiOption) => {
    const axiosOption = {
        method,
        url: DOMAIN + url,
        data,
        options: {withCredentials: true},
    };
    optionConvert(<AxiosOption>axiosOption, option);

    return axios(axiosOption).then(async result => {

        return result;
    })
        .catch(async result => {
            throw result.response;
        });
};

const optionConvert = (axiosOption: AxiosOption,  option: ApiOption) => {
    if(option?.excel) {
        axiosOption.responseType = "arraybuffer";
    }
    const headers:any = {};
    if(option?.multipart) {
        headers["Content-Type"] = "multipart/form-data";
    }
    axiosOption.headers = headers;
};