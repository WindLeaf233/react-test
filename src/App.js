import React, { Children } from 'react'
import { Grommet, Page, Header, Heading, Box, Card, CardBody, Markdown, Text, Footer, Nav, Button } from 'grommet'
import { Announce, Info } from 'grommet-icons'


const RouterContext = React.createContext({})

const Router = ({ children }) => {
    const [path, setPath] = React.useState("/announcement")

    React.useEffect(() => {
        const onPopState = () => setPath(document.location.pathname)
        window.addEventListener('popstate', onPopState)
        return () => window.removeEventListener('popstate', onPopState)
    }, [])

    const push = nextPath => {
        if (nextPath !== path) {
            window.history.pushState(undefined, undefined, nextPath)
            setPath(nextPath)
            window.scrollTo(0, 0)
        }
    }

    return (
        <RouterContext.Provider value={{ path, push }}>
            {children}
        </RouterContext.Provider>
    )
}

const Routes = ({ children }) => {
    const { path: contextPath } = React.useContext(RouterContext)
    let found
    Children.forEach(children, child => {
        if (!found && contextPath === child.props.path) found = child
    })
    return found
}

const Route = ({ Component, path }) => {
    const { path: contextPath } = React.useContext(RouterContext)
    return contextPath === path ? <Component /> : null
}

const theme = {
    "global": {
        "colors": {
            "background": {
                "light": "#ffffff",
                "dark": "#000000"
            }
        },
        "font": {
            "family": "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
        }
    },
    "button": {
        "extend": [
            null
        ]
    }
}
const Announcement = () => {
    const { push } = React.useContext(RouterContext)

    return (
        <Page kind="full">
            <Header align="center" direction="row" flex={false} justify="between" gap="medium">
                <Heading level="2" margin="medium" size="large">
                    公告栏
                </Heading>
            </Header>
            <Box align="center" justify="center" hoverIndicator={false} animation={{"type":"zoomIn","size":"large"}} overflow="visible" direction="column" pad="medium">
                <Card width="100%" height="100%" border={{"color":"border","size":"small","side":"bottom","style":"dashed"}} margin="xsmall" overflow="visible" pad="xsmall">
                    <CardBody pad="small" overflow="auto" margin="small">
                        <Markdown>
                            hello, world!
                            *markdown is available*
                            **sooo coolll**
                        </Markdown>
                    </CardBody>
                    <Text textAlign="end" size="small" truncate={false} weight="normal" margin="xsmall" color="dark-5">
                        user1
                    </Text>
                </Card>
            </Box>
            <Footer align="center" direction="row" flex={false} justify="between" wrap={false}>
                <Nav align="center" flex="shrink" margin="xlarge" fill overflow="visible" pad="xsmall" justify="center" direction="row">
                    <Button icon={<Announce />} active={false} hoverIndicator={false} plain={false} primary type="button" onClick={() => push("/announcement")} />
                    <Button icon={<Info />} primary={false} plain={false} secondary={false} type="button" onClick={() => push("/about")} />
                </Nav>
            </Footer>
        </Page>
    )
}

const About = () => {
    const { push } = React.useContext(RouterContext)

    return (
        <Page>
            <Header align="center" direction="row" flex={false} justify="between" gap="medium">
                <Heading level="2" margin="medium" size="large">
                    关于
                </Heading>
            </Header>
            <Footer align="center" direction="row" flex={false} justify="between" wrap={false}>
                <Nav align="center" flex="shrink" margin="xlarge" fill overflow="visible" pad="xsmall" justify="center" direction="row">
                    <Button icon={<Announce />} active={false} hoverIndicator={false} plain={false} primary={false} type="button" onClick={() => push("/announcement")} />
                    <Button icon={<Info />} primary plain={false} secondary={false} type="button" reverse={false} onClick={() => push("/about")} />
                </Nav>
            </Footer>
        </Page>
    )
}

const App = () => (
    <Grommet full theme={theme}>
        <Router>
            <Routes>
                <Route path="/announcement" Component={Announcement} />
                <Route path="/about" Component={About} />
            </Routes>
        </Router>
    </Grommet>
);

export default App;
