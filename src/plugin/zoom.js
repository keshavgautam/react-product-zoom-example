import React, { PropTypes, useEffect, useState, useRef } from "react";
import "./zoom.css";
import Style from "./style";
import LeftButton from "./components/LeftButton";
import RightButton from "./components/RightButton";
function Zoom(props) {
  const lensEl = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lensStyle, setlensStyle] = useState({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  });
  const lensOriStyle = {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  };
  const [theaterStyle, setTheaterStyle] = useState({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  });
  const [theaterStyle1, setTheaterStyle1] = useState({
    width: 800,
    height: 800,
  });
  useEffect(() => {
    // console.log(props);
  });
  const getSmallImage = () => {
    return props.images[activeIndex].small;
  };
  const getBigImage = () => {
    return props.images[activeIndex].small;
  };
  const getTranslate = () => {
    var a = activeIndex * props.size.thumb + 5;
    var b = 0;
    if (props.size.small < a) {
      b = props.size.small / 2 + (props.size.thumb * a) / props.size.small;
    }
    if (b > props.size.small / 2) {
      b = props.size.small + activeIndex * 5;
    }
    // console.log(b, "activeIndex=>", activeIndex, "a=>", a);
    return -b;
  };

  const goLeft = () => {
    let a = activeIndex - 1;
    if (a >= 0) {
      setActiveIndex(a);
    }
  };
  const goRight = () => {
    let a = activeIndex + 1;
    if (a <= props.images.length - 1) {
      setActiveIndex(a);
    }
  };
  const showTheater = (e) => {
    let { offsetLeft: lensElLeft, offsetTop: lensElTop } = lensEl.current;
    let left = e.clientX;
    let top = e.clientY;
    let width = lensStyle.width;
    let height = lensStyle.height;
    let lens = { ...lensStyle };

    if (top + height > props.size.small) {
      let d1 = top - height / 2;
      let d2 = props.size.small - height;
      lens.top = d1 > d2 ? d2 : d1;
    } else {
      if (top < height / 2) {
        lens.top = 0;
      } else {
        lens.top = top - height / 2;
      }
    }

    if (left + width > props.size.small) {
      let d3 = left - width / 2;
      let d4 = props.size.small - width;
      lens.left = d3 > d4 ? d4 : d3;
    } else {
      if (left < width / 2) {
        lens.left = 0;
      } else {
        lens.left = left - width / 2;
      }
    }

    //---------
    let lensleft = lensElLeft;
    let lenstop = lensElTop;
    console.log("lensleft=>", lensleft, "lenstop=>", lenstop);
    let windowiInnerHeight =
      window.innerHeight > 600 ? 600 : window.innerHeight;
    let windowiInnerWidth = window.innerWidth > 1000 ? 1000 : window.innerWidth;
    windowiInnerWidth -= props.size.small;
    let theaterLeft = props.size.small;
    let theater = { ...theaterStyle };
    let theater1 = { ...theaterStyle1 };
    //width
    theater.width = windowiInnerWidth;
    theater.height = windowiInnerHeight;
    let theaterScaleRatio = theater.width / theater.height;
    theaterScaleRatio = Math.round(theaterScaleRatio * 100) / 100;
    if (theaterScaleRatio !== 1) {
      if (1.2 < theaterScaleRatio || theaterScaleRatio < 0.9) {
        if (theater.width > theater.height) {
          lens.height =
            lensOriStyle.height *
            (theaterScaleRatio > 2
              ? theaterScaleRatio / 2 - 1
              : theaterScaleRatio - 1);
          lens.width = lensOriStyle.width;
        } else {
          lens.width = lensOriStyle.width * theaterScaleRatio;
          lens.height = lensOriStyle.height;
        }
      }
    }

    //left
    theater.left = theaterLeft;
    theater.top = 0;
    // theater.backgroundImage = `url('${getBigImage()}')`;
    theater1.transform = ` translate3d(${-4 * lensleft}px, ${
      -4 * lenstop
    }px, 0px)`;
    //width
    theater1.width = 4 * props.size.small;
    theater1.height = 4 * props.size.small;

    setTheaterStyle(theater);
    setTheaterStyle1(theater1);
    setlensStyle(lens);
    console.log(
      "theaterScaleRatio=>",
      theaterScaleRatio,
      "props.size.small=>",
      props.size.small,
      "theater1.width=>",
      theater1,
      "theaterStyle=>",
      theaterStyle,
      "lens=>",
      lens
    );
  };

  return (
    <div className="wrap">
      <div className="image-theater-wrap" style={theaterStyle}>
        <img style={theaterStyle1} src={getBigImage()} alt="" />
      </div>
      <div
        className="image-wrap"
        style={{ width: props.size.small, height: props.size.small }}
        onMouseMove={(e) => {
          showTheater(e);
        }}
        onMouseOut={(e) => {}}
      >
        <img className="image-wrap-image" src={getSmallImage()}></img>
        <div className="image-lens-wrap" ref={lensEl} style={lensStyle}></div>
      </div>
      <div
        className="thumb-wrap"
        style={{
          width: props.size.small,
          height: props.size.thumb + 5,
        }}
      >
        {props.navigation.left && (
          <div className="navigation-button-h left" onClick={goLeft}>
            <LeftButton />
          </div>
        )}
        {props.navigation.right && (
          <div className="navigation-button-h right" onClick={goRight}>
            <RightButton />
          </div>
        )}
        <div
          className="thumb-sub-wrap"
          style={{
            transform: `translateX(${getTranslate()}px)`,
          }}
        >
          {props.images.map((img, index) => {
            return (
              <div
                key={index}
                style={{
                  minWidth: props.size.thumb,
                  minHeight: props.size.thumb,
                }}
                className={`tile${activeIndex === index ? " active-tile" : ""}`}
                onClick={() => {
                  setActiveIndex(index);
                }}
                onMouseMove={() => {
                  //  setActiveIndex(index);
                }}
              >
                <img src={img.thumb}></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Zoom.defaultProps = {
  images: [
    {
      thumb:
        "https://rukminim1.flixcart.com/image/128/128/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      small:
        "https://rukminim1.flixcart.com/image/416/416/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      big: "https://rukminim1.flixcart.com/image/832/832/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
    },
    {
      thumb:
        "https://rukminim2.flixcart.com/image/612/612/kuef2q80/role-play-toy/0/h/u/princess-set-20-glowstaar-5-original-imag7j93aup8waha.jpeg?q=70",
      small:
        "https://rukminim2.flixcart.com/image/612/612/kuef2q80/role-play-toy/0/h/u/princess-set-20-glowstaar-5-original-imag7j93aup8waha.jpeg?q=70",
      big: "https://rukminim1.flixcart.com/image/832/832/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
    },
    {
      thumb:
        "https://rukminim1.flixcart.com/image/416/416/kn97te80/kitchen-trolley/h/n/2/multipurpose-stainless-steel-storage-box-pantry-kitchen-office-original-imagfz758qfzjdhv.jpeg?q=70",
      small:
        "https://rukminim1.flixcart.com/image/416/416/kn97te80/kitchen-trolley/h/n/2/multipurpose-stainless-steel-storage-box-pantry-kitchen-office-original-imagfz758qfzjdhv.jpeg?q=70",
      big: "https://rukminim1.flixcart.com/image/416/416/kn97te80/kitchen-trolley/h/n/2/multipurpose-stainless-steel-storage-box-pantry-kitchen-office-original-imagfz758qfzjdhv.jpeg?q=70",
    },
    {
      thumb:
        "https://rukminim1.flixcart.com/image/128/128/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      small:
        "https://rukminim1.flixcart.com/image/416/416/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      big: "https://rukminim1.flixcart.com/image/832/832/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
    },
    {
      thumb:
        "https://rukminim1.flixcart.com/image/128/128/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      small:
        "https://rukminim1.flixcart.com/image/416/416/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      big: "https://rukminim1.flixcart.com/image/832/832/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
    },
    {
      thumb:
        "https://rukminim1.flixcart.com/image/128/128/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      small:
        "https://rukminim1.flixcart.com/image/416/416/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      big: "https://rukminim1.flixcart.com/image/832/832/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
    },
    {
      thumb:
        "https://st.hzcdn.com/simgs/pictures/bedrooms/apartment-401-abhishek-shah-img~59719abc0e8abd3a_3-3062-1-51280c9.jpg",
      small:
        "https://rukminim1.flixcart.com/image/416/416/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      big: "https://rukminim1.flixcart.com/image/832/832/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
    },
    {
      thumb:
        "https://rukminim2.flixcart.com/image/500/500/kmmcrrk0/mobile/z/g/b/8-rmx3085-realme-original-imagfgpgzg9kp9hg.jpeg?q=70",
      small:
        "https://rukminim1.flixcart.com/image/416/416/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      big: "https://rukminim1.flixcart.com/image/832/832/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
    },
  ],

  size: {
    thumb: 100,
    small: 400,
  },
  navigation: {
    left: LeftButton,
    right: RightButton,
  },
};

export default Zoom;
