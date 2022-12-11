import {
  Card,
  CardContent,
  Dialog,
  List,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Tag } from '../tag/tag';
import { Captcha } from './captcha';

export interface CaptchaDemoProps {
  quiz: Omit<Captcha, 'hash'>;
  trues: string[];
  goNext: () => void;
}
// TODO: read from captcha
const BASE_SEZE_XS = 360;
const BASE_SIZE_MD = 400;
export function CaptchaDemo({ quiz, trues, goNext }: CaptchaDemoProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  // custom select tags
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const fallbackSize = isMobile ? BASE_SEZE_XS : BASE_SIZE_MD;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ids = trues
      .sort(() => Math.random() - 0.5)
      .map((tag, index) => {
        return setTimeout(() => {
          setSelectedTags(s => new Set(s.add(tag)));
        }, Math.round((2 ^ index) * 600) + 5000);
      });

    return () => {
      ids.map(clearTimeout);
    };
  }, []);

  useEffect(() => {
    console.log(`here`, loading);
    if (loading) return;

    if (selectedTags.size === trues.length) {
      setLoading(true);
      setTimeout(() => {
        console.log(`next`);
        goNext();
        setLoading(false);
      }, 1500);
    }
  }, [selectedTags, loading]);

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: { xs: BASE_SEZE_XS, md: BASE_SIZE_MD },
        borderRadius: 4,
        background: 'rgb(24 24 27)',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          maxHeight: { xs: BASE_SEZE_XS, md: BASE_SIZE_MD },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Image
          alt={'cptcha quiz image background'}
          fill
          src={quiz.image.url}
          draggable={false}
          style={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
            position: 'absolute',
            inset: 0,
          }}
        />
        <Image
          alt={'cptcha quiz image'}
          width={quiz.image.width || fallbackSize}
          height={quiz.image.height || fallbackSize}
          src={quiz.image.url}
          draggable={false}
          priority
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: fallbackSize,
            position: 'relative',
          }}
        />
      </Stack>

      <CardContent sx={{ pb: { xs: 0.5, md: 2 } }}>
        <Typography
          sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, color: 'white' }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Choose tags that best describe the image:
        </Typography>

        <List sx={{ flexDirection: 'row', flexWrap: 'wrap' }} disablePadding>
          {quiz.tags.map(tag => (
            <Tag
              sx={{
                '& .MuiChip-root': {
                  color: 'white',

                  border: `1px solid ${
                    !selectedTags.has(tag) ? 'white' : 'transparent'
                  }`,
                },
              }}
              key={tag}
              label={tag}
              selected={selectedTags.has(tag)}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
