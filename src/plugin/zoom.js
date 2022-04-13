import React, { PropTypes, useEffect, useState } from "react";
import "./zoom.css";
import Style from "./style";

function LeftButton() {
  return (
    <svg
      width="8"
      height="15"
      viewBox="0 0 16 27"
      xmlns="http://www.w3.org/2000/svg"
      class="_1YdSSj"
    >
      <path
        d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
        fill="#000"
        class=""
      ></path>
    </svg>
  );
}

function RightButton() {
  return (
    <svg
      width="14.6"
      height="24"
      viewBox="0 0 16 27"
      xmlns="http://www.w3.org/2000/svg"
      class="_1xtBwk"
    >
      <path
        d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
        fill="#000"
        class="_23HYg_"
      ></path>
    </svg>
  );
}

function Zoom(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const getSmallImage = () => {
    return props.images[activeIndex].small;
  };
  const getTranslate = () => {
    var a = activeIndex * props.size.thumb + 5;
    var b = 0;
    if (props.size.small < a) {
      b = props.size.small / 2;
    }
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

  useEffect(() => {
    console.log(props);
  });

  return (
    <div className="wrap">
      <div
        className="image-wrap"
        style={{ width: props.size.small, height: props.size.small }}
      >
        <img className="image-wrap-image" src={getSmallImage()}></img>
      </div>
      <div
        className="thumb-wrap"
        style={{
          width: props.size.small,
          height: props.size.thumb + 5,
        }}
      >
        {props.navigation.left && (
          <div class="navigation-button-h left" onClick={goLeft}>
            <LeftButton />
          </div>
        )}
        {props.navigation.right && (
          <div class="navigation-button-h right" onClick={goRight}>
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
        "https://rukminim1.flixcart.com/image/128/128/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
      small:
        "https://rukminim1.flixcart.com/image/416/416/kjym9ow0/television/e/c/i/42path2121-42path2121-thomson-original-imafzff3hhm2x7dh.jpeg?q=70",
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
