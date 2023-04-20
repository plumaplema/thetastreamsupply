import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import { Flex } from '@chakra-ui/react';

const Lottie = ({ animationData }) => {

    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        });
    }, []);

    return <Flex bgColor={'red'} ref={container} />;
};

export default Lottie;
