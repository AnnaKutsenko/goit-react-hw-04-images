import { Triangle } from 'react-loader-spinner';
import {Backdrop} from './Loader.styled'

export const Loader = () => {
    return (
        <Backdrop>
            <Triangle 
                height="80"
                width="80"
                color="#2f24c9"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </Backdrop>
    )
}
