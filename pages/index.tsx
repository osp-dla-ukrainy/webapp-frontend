import type { NextPage } from 'next'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box mb={4}>
            <Box>
              <Button
                endIcon={<NavigateNext />}
                size="large"
                variant="contained"
              >
                organizacja
              </Button>
            </Box>
            <Typography
              component="p"
              variant="caption"
            >
              (OSP/punkt zbiórek/pojedyncza zbiorka)
            </Typography>
          </Box>
          <Box mb={2}>
            <Link
              href="/signup/person"
              passHref
            >
              <Button
                endIcon={<NavigateNext />}
                size="large"
                variant="contained"
              >
                pojedynczy ochotnik
              </Button>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Home
