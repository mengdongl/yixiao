import { useUrlParams } from 'utils/url';
export const useWorksSearchParams = () =>{
    return useUrlParams(['taskFrom','status','taskType'])
}