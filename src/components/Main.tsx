import { Flex, FlexProps } from '@chakra-ui/react'
import Footer from './Footer'

export const Main = (props: FlexProps) => {
  return (
    <>
      <Flex
        direction="column"
        alignItems="stretch"
        justifyContent="flex-start"
        bgGradient="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 100%)"
        width={"100%"}
        {...props}
        pb={10}
      />
      <Footer />
    </>

  )
}
