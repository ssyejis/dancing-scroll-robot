import { useEffect, useRef } from "react";
import gsap from "gsap";

function ScrollBanner() {
  const banner = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    const bannerImgItems = banner.current.querySelectorAll('.banner_item');
    const bannerDetail = banner.current.querySelectorAll('.banner_detail');
    bannerImgItems.forEach((item, i) => {
      const itemsImg = item.querySelectorAll('.banner_img')[0];

      tl.to(item, {
        opacity: i !== 0 ? 0 : 1,
        scrollTrigger: {
          trigger: banner.current,
          start: `${(i+1)*25}% bottom`,
          end: `${(i+2)*25}% bottom`,
          onEnter: () => {
            gsap.to(item, { opacity: 1 });
          },
          onLeaveBack: () => {
            gsap.to(item, { opacity: i !== 0 ? 0 : 1 });
          },
        }
      }).to(itemsImg, {
        scale: 1,
        scrollTrigger: {
          trigger: banner.current,
          start: `${(i+1)*25}% bottom`,
          end: `${(i+2)*25}% bottom`,
          onUpdate: (self) => {
            const progress = self.progress;
            const scaleValue = 1 + (progress * 0.2);
            gsap.to(itemsImg, { scale: scaleValue });
          },
        }
      })
    })

    bannerDetail.forEach((item, i) => {
      tl.to(item, {
        maxHeight: 0,
        scrollTrigger: {
          trigger: banner.current,
          start: `${(i+1)*25}% bottom`,
          end: `${(i+2)*25}% bottom`,
          onEnter: () => {
            gsap.to(item, { maxHeight: '140px' });
          },
          onLeave: () => {
            gsap.to(item, { maxHeight: i !== 2 ? 0 : '140px' });
          },
          onEnterBack: () => {
            gsap.to(item, { maxHeight: '140px' });
          },
          onLeaveBack: () => {
            gsap.to(item, { maxHeight: 0 });
          },
        }
      })
    });

    return () => {
        tl.kill();
    }

},[]);
  return (
    <div>
        <div className="banner" ref={banner}>
            <h1>Scroll Banner Component</h1>
          <div className="banner_inner">
            <div className="banner_text">
                <ul>
                    <li>
                        <p>가치관</p>
                        <div className="banner_detail">가치관 내용<br />가치관 내용<br />가치관 내용</div>
                    </li>
                    <li>
                        <p>가치관</p>
                        <div className="banner_detail">가치관 내용<br />가치관 내용<br />가치관 내용</div>
                    </li>
                    <li>
                        <p>가치관</p>
                        <div className="banner_detail">가치관 내용<br />가치관 내용<br />가치관 내용</div>
                    </li>
                </ul>
            </div>
            <ul className="banner_list">
              <li className="banner_item">
                <img className="banner_img" src="https://swiperjs.com/demos/images/nature-1.jpg" alt="value 이미지1" />
              </li>
              <li className="banner_item">
                <img className="banner_img" src="https://swiperjs.com/demos/images/nature-2.jpg" alt="value 이미지2" />
              </li>
              <li className="banner_item">
                <img className="banner_img" src="https://swiperjs.com/demos/images/nature-3.jpg" alt="value 이미지3" />
              </li>
            </ul>
          </div>
        </div>
    </div>
  );
}

export default ScrollBanner;