import { SwiperSlide, Swiper } from 'swiper/react';
import { breakpointsSwiper } from '../utils/utils';
import Track from './Items/Track';
import { Navigation } from 'swiper/modules';

function Carousel({ infos, title }: { infos?: Track[]; title: string }) {
  return (
    <div className="space-y-2 lg:max-w-[80vw]">
      <h2 className="font-semibold">{title}</h2>
      <Swiper slidesPerView={3} breakpoints={breakpointsSwiper} modules={[Navigation]} navigation>
        {infos?.map((track, index) => (
          <SwiperSlide key={index}>
            <Track infos={track} collum />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
