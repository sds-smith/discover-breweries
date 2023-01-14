import styled from "@emotion/styled";
import primaryImage from '../../assets/jon-parry-C8eSYwQkwHw-unsplash.jpg';
import secondaryImage from '../../assets/louis-hansel-WCm4dFvZnMM-unsplash.jpg';

type NavigationContainerProps = {
    imageToDisplay: number;
}

export const NavigationContainer = styled.div<NavigationContainerProps>`
    position: relative;
    height: 100vh;

    &:before {
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: ${props => props.imageToDisplay === 1 ? `url(${primaryImage})` : `url(${secondaryImage})`};
        background-position: 0 0;
        background-size:cover;
        background-repeat: no-repeat;
        opacity: .4;
        z-index: -1;
    }
`