"use client"

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import EventIcon from "@mui/icons-material/Event"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useUser } from "@/context/user-context"
import styles from "@/styles/navbar.module.scss"

const pages = [
  { name: "Dashboard", path: "/" },
  { name: "Create Event", path: "/events/create" },
]

function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget)
  const handleCloseNavMenu = () => setAnchorElNav(null)
  const handleCloseUserMenu = () => setAnchorElUser(null)
  const handleMenuItemClick = (path: string) => {
    router.push(path)
    handleCloseUserMenu()
  }

  return (
    <AppBar position="static" elevation={1} className={styles.navbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EventIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            className={styles.brand}
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          >
            EventHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu} color="default">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => { router.push(page.path); handleCloseNavMenu() }}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            className={styles.brand}
            sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1, mr: 2 }}
          >
            EventHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" },justifyContent: "center", }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                href={page.path}
                className={pathname === page.path ? styles.selectedNav : styles.navButton}
                onClick={handleCloseNavMenu}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                <Avatar alt={user?.name || "User"}  src={user?.avatarUrl || "/placeholder.svg?height=40&width=40"} className={styles.avatar}  />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleMenuItemClick("/profile")}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("/settings")}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("/logout")}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
