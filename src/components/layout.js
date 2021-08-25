import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Hamburger from "./header/Hamburger"
import Header from "./header/Header"
import OverlayMenu from "./header/OverlayMenu"
import "./layout.css"
 
 
 const Layout = ({ children }) => {
   const [menuOpen, setMenuOpen] = useState(false)
 
   const handleOverlayMenu = () => setMenuOpen(!menuOpen)
 
   const data = useStaticQuery(graphql`
     query SiteTitleQuery {
       site {
         siteMetadata {
           title
         }
       }
     }
   `)
 
   return (
     <>
       <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
       <Hamburger handleOverlayMenu={handleOverlayMenu} />
       <OverlayMenu handleOverlayMenu={handleOverlayMenu} menuOpen={menuOpen} />
       <div
         style={{
           margin: `0 auto`,
           maxWidth: "auto",
           padding: 0,
           paddingBottom: "2rem",
         }}
       >
         <main>{children}</main>
         {/* <footer
           style={{
             marginTop: `2rem`,
           }}
         >
           © {new Date().getFullYear()}, Built with
           {` `}
           <a href="https://www.gatsbyjs.com">Gatsby</a>
         </footer> */}
       </div>
     </>
   )
 }
 
 Layout.propTypes = {
   children: PropTypes.node.isRequired,
 }
 
 export default Layout