/**
 * This file contain two components: Wrapper and Main
 * 
 * Use the Wrapper Component to wrap your entire page.
 * Use The Main Component to wrap the page content.
 * This will help to make the footer stick to the bottom of the page.
 * 
 * Example Of Usage
 * 
 * <Wrapper>
 * <Header>
 *  Page Header Here.
 * </Header>
 *  <Main>
 *      Page Content Here.
 *  </Main>
 * <Footer>
 *      Footer Content, this component will always stick to the bottom of the page.
 * </Footer>
 * </Wrapper/>
 */
import { styled } from "@material-ui/core";

export const LayoutWrapper = styled('div')({
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
});

export const Main = styled('main')({
    flex: 1,
});