import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../data/images';

const cinematicMotion = {
  scale: [1, 1.1, 1.06, 1.12, 1],
  x: ['0%', '-3%', '1.5%', '-1.5%', '0%'],
  y: ['0%', '-1.5%', '2%', '-0.5%', '0%'],
};

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const src = images.hero.video;
    if (!src) return;

    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setUseVideo(true);
      })
      .catch(() => setUseVideo(false));
  }, []);

  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const onError = () => setUseVideo(false);
    video.addEventListener('error', onError);
    video.play().catch(() => setUseVideo(false));

    return () => video.removeEventListener('error', onError);
  }, [useVideo]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {useVideo && images.hero.video ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={images.hero.studio}
          aria-label="Stretch and Chill studio interior"
        >
          <source src={images.hero.video} type="video/mp4" />
        </video>
      ) : (
        <motion.img
          src={images.hero.studio}
          alt="Stretch and Chill studio — reformers in soft sunlight"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          animate={cinematicMotion}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-transparent to-cream/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-misty/15 via-transparent to-sage-light/15" />
    </div>
  );
}
