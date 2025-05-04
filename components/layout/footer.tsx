"use client"

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import EmailIcon from "@mui/icons-material/Email"
import styles from "@/styles/footer.module.scss"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <AppBar position="static" component="footer" elevation={0} className={styles.footer}>
      <Container maxWidth="lg">
        <Toolbar disableGutters className={styles.toolbar}>
          <Box className={styles.social}>
            <IconButton href="https://github.com/himeshiddamalgoda/assignment-softvil-technologies" aria-label="GitHub" size="small">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/himesh-iddamalgoda/" aria-label="LinkedIn" size="small">
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton href="mailto:support@eventhub.com" aria-label="Email" size="small">
              <EmailIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2" className={styles.copy}>
            © {currentYear} EventHub. All rights reserved.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
