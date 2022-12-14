import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useReducer } from 'react';
import { CaptchaDemo } from 'src/component/captcha/demo';
import { Testable } from 'src/component/captcha/testable';
import { LandingData } from 'src/constants/landing';

export default function Home() {
  const [index, increment] = useReducer(s => {
    const nextIndex = (s + 1) % LandingData.length;
    if (nextIndex) return nextIndex;
    return s;
  }, 0);

  return (
    <Grid
      container
      sx={{
        justifyContent: 'space-between',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Grid item xs={12} md={6}>
        <Typography
          sx={{
            fontSize: { xs: 30, md: 40 },
            mx: 1,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
          }}
        >
          Diffusion captcha
          <Typography
            component="small"
            sx={{ display: 'block', fontSize: 10, textTransform: 'uppercase' }}
          >
            for
          </Typography>
          <Typography
            component="span"
            sx={{
              display: 'block',
              fontSize: { xs: 30, md: 40 },
              mx: 1,
              fontWeight: 'bold',
              color: LandingData[index].color,
            }}
          >
            {LandingData[index].title}
          </Typography>
        </Typography>

        <Stack
          alignItems="center"
          style={{ opacity: Number(index >= 1) }}
          sx={{
            opacity: 0,
            width: index >= 1 ? 'unset' : 0,
            height: index >= 1 ? 'unset' : 0,
            visibility: index >= 1 ? 'unset' : 'hidden',
            display: 'flex',
            mt: 2,
            transition: 'opacity',
            animationTimingFunction: 'ease-in',
            transitionDuration: '1500ms',
            transitionDelay: '500ms',
          }}
        >
          <Testable />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <CaptchaDemo
          {...LandingData[index]}
          goNext={increment}
          key={index}
          index={index}
        />
      </Grid>
    </Grid>
  );
}
