import { Box, BoxProps } from '@mui/material';
import { useRef } from 'react';

export function DiCaptchaLogo(props: BoxProps) {
  const hash = useRef(Math.random());
  const prefix = hash.current;
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 287.77 317.89"
      {...props}
    >
      <path fill="none" d="M0 0h287.77v317.9H0z" pointer-events="none" />
      <linearGradient
        id={`${prefix}-a`}
        x1="664.04"
        x2="742.07"
        y1="205.49"
        y2="205.49"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#fff33b" />
        <stop offset="1" stop-color="#e93e3a" />
      </linearGradient>
      <linearGradient
        id={`${prefix}-b`}
        x1="664.04"
        x2="679.31"
        y1="188.31"
        y2="188.31"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#e93e3a" />
        <stop offset="1" stop-color="#3a0adf" />
      </linearGradient>
      <linearGradient
        id={`${prefix}-c`}
        x1="664.04"
        x2="742.07"
        y1="171.13"
        y2="171.13"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#0ff" />
        <stop offset="1" stop-color="#00f" />
      </linearGradient>
      <linearGradient
        id={`${prefix}-d`}
        x1="724.75"
        x2="742.07"
        y1="153.96"
        y2="153.96"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#fff33b" />
        <stop offset="1" stop-color="#e93e3a" />
      </linearGradient>
      <path
        fill="#FFF"
        d="M282.2 311.94v-92.7H85.5V204.2h133.75l62.95-71.1V4.06h-85.5v107.43H62.33L6.27 183.2v57l56.06 71.73z"
      />
      <path
        fill={`url(#${prefix}-a)`}
        d="M664 195.7h78.1v19.6h-62.8z"
        transform="translate(-2057.77 -378.05) scale(3.132)"
      />
      <path
        fill={`url(#${prefix}-b)`}
        d="M679.3 161.3v54L664 195.7v-14.8z"
        transform="translate(-2057.77 -378.05) scale(3.132)"
      />
      <path
        fill={`url(#${prefix}-c)`}
        d="M664 180.9h60.8l8.6-9.8 8.7-9.8h-62.8z"
        transform="translate(-2057.77 -378.05) scale(3.132)"
      />
      <path
        fill={`url(#${prefix}-d)`}
        d="m724.8 180.9 17.3-19.6V127h-17.3z"
        transform="translate(-2057.77 -378.05) scale(3.132)"
      />
    </Box>
  );
}
