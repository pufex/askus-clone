import { Outlet } from "react-router-dom"
import Nav from "./Nav"

const Layout = () => {
    return <>
        <Nav />
        <main className="app">
            <Outlet />
        </main>
    </>
}

export default Layout
