import { HTMLProps } from 'react'
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

import Link from 'next/link';

export const Layout = ({ children }: HTMLProps<HTMLDivElement>) => {
  return (
      <Container maxWidth="lg">
        <header>
          <Box pt={2}>
            <Link href="/">
              <a>
                <Typography
                  variant="h6"
                  component="h1"
                  mb={1}
                >
                  <strong>OSP</strong>
                  dla
                  <strong>UKRAINY</strong>
                </Typography>
              </a>
            </Link>
          </Box>
        </header>
        <main>
          {children}
        </main>
      </Container>
  );
}
