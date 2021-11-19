import { createGlobalStyle } from "styled-components";

import Poppins from "../fonts/Poppins-Light.ttf";
import PoppinsThick from "../fonts/Poppins-SemiBold.ttf";
import SpaceMono from '../fonts/SpaceMono-Regular.ttf'



export default createGlobalStyle`

    @font-face {
        font-family: 'Poppins';
        src: url(${Poppins}) format('woff2')
    }

    @font-face {
        font-family: 'PoppinsThick';
        src: url(${PoppinsThick}) format('woff2')
    }

    @font-face {
        font-family: 'SpaceMono';
        src: url(${SpaceMono}) format('woff2')
    }

   
`;
