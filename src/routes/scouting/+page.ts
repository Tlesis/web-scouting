import type { PageLoad } from "./$types";


//import axios from 'axios';

const frcapiEvent = 'mose';
const frcapiToken = import.meta.env.VITE_TBA_API_TOKEN;
const year = new Date().getFullYear();
const frcapiUrl = `https://www.thebluealliance.com/api/v3/event/${year}${frcapiEvent}/teams?X-TBA-Auth-Key=${frcapiToken}`;


export const load = (async ( { params }) => {
    /* const response = await axios.get(frcapiUrl, {
        timeout: 5000,
        params: {
            'X-TBA-Auth-Key': frcapiToken,
        },
    }); */

    return { url: `${frcapiUrl}`};//response.data;
}) satisfies PageLoad;
