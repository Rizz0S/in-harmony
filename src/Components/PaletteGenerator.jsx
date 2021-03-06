import React, { useEffect, useLayoutEffect, useState } from 'react';
import Swatch from './Swatch';

import getPixels from 'get-pixels';

const DEFAULT_DEPTH = 3;
const DEFAULT_COL = {r: 255, b: 255, g: 255};

// MEDIAN CUT
const getPixelsAndConvertToRGB = (uploadedFile) => {
    // get-pixels is async, so a promise must be used
    return new Promise((resolve, reject) => {
        getPixels(uploadedFile, (err, pixels) => {
            if (err) {
                console.log("no good!");
                reject(err);
            }
            resolve(convertPixelsToRGB(pixels))
        })
    })
 }

const convertPixelsToRGB = (pixels) => {
    // width && height of the image
    const width = pixels.shape[0];
    const height = pixels.shape[1];

    // init the aray
    const rgbArr = []
    
    // go through each pixel, add an RGB object for each one
    // this must be done because get-pixels returns one large array of the RGB vals in order, but not individually separated
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const idx = (i * width + j) * 4;
            rgbArr.push({
                r: pixels.data[idx],
                g: pixels.data[idx + 1],
                b: pixels.data[idx + 2]
            });
        }
    }

    return rgbArr;
}

const findBiggestRange = (rgbArr) => {
    // set init values
    let rMin = Number.POSITIVE_INFINITY;
    let rMax = Number.NEGATIVE_INFINITY;

    let gMin = Number.POSITIVE_INFINITY;
    let gMax = Number.NEGATIVE_INFINITY;

    let bMin = Number.POSITIVE_INFINITY;
    let bMax = Number.NEGATIVE_INFINITY;

    // find the min and the max RGB values for each pixel
    rgbArr.forEach(pixel => {
        // this will compare the most recently set min value to the current iteration's value
        rMin = Math.min(rMin, pixel.r);
        rMax = Math.max(rMax, pixel.r);
        gMin = Math.min(gMin, pixel.g);
        gMax = Math.max(gMax, pixel.g);
        bMin = Math.min(bMin, pixel.b);
        bMax = Math.max(bMax, pixel.b);
      });
  
      // calculate the ranges 
      const rRange = rMax - rMin;
      const gRange = gMax - gMin;
      const bRange = bMax - bMin;
  
      // return whichever one has the biggest range
      const biggestRange = Math.max(rRange, gRange, bRange);
      if (biggestRange === rRange) {
        return 'r';
      } else if (biggestRange === gRange) {
        return 'g';
      }
      return 'b';
}

const quantize = (rgbArr, depth=0, maxDepth=DEFAULT_DEPTH) => {
    // sorting algo that recursively cuts at the median point of the longest range

    // base case: average all the buckets by their RGB vals
    if (depth === maxDepth) {
        // reducer that accumulates each RGB val in the bucket
        const color = rgbArr.reduce((prev, curr) => {
            prev.r += curr.r;
            prev.g += curr.g;
            prev.b += curr.b;
            return prev;
          }, {
            r: 0,
            g: 0,
            b: 0
          });
    
          // average them && return
          color.r = Math.round(color.r / rgbArr.length);
          color.g = Math.round(color.g / rgbArr.length);
          color.b = Math.round(color.b / rgbArr.length);
    
          return [color];
    }

    // recursive case: sort all the pixels in the bucket by the RGB channel that has the biggest range. cut it by the median, then go again.

    const channelWithBiggestRange = findBiggestRange(rgbArr);
    rgbArr.sort((pixel1, pixel2) => {
       return (pixel1[channelWithBiggestRange] - pixel2[channelWithBiggestRange])
    })

    // split into two buckets based on the mid-point
    const midPoint = (rgbArr.length / 2);
    const rightBucket = rgbArr.slice(0, midPoint)
    const leftBucket = rgbArr.slice(midPoint + 1);

    // quantize both buckets
    // this will run until depth reaches the maxDepth
    return [...quantize(rightBucket, depth + 1, maxDepth), ...quantize(leftBucket, depth + 1, maxDepth)]
}


const PaletteGenerator = (props) => {

    const {currentPalette, setCurrentPalette, uploadedFile, numColors} = props;
    const [loading, setLoading] = useState(false);

    useEffect(() =>  {
        if (uploadedFile.length > 0) {
            setLoading(true);
            setTimeout( () => {
                getPixelsAndConvertToRGB(uploadedFile)
                .then((rgbArr) => {
                    const result = quantize(rgbArr);
                    const final = result.slice(1, numColors).concat(result[result.length - 1]);
                    const paletteToSet = final.reduce((acc, current, idx) => {
                        acc[`color${idx + 1}`] = current;
                        return acc;
                    }, {})
                    if (numColors < 6) {
                        for (let i = numColors; i <= 6; i++) {
                            paletteToSet[`color${i + 1}`] = DEFAULT_COL;
                        }
                    }
                    setCurrentPalette(paletteToSet);
                    setLoading(false);
                })
            }, 100)
        }
    }, [uploadedFile, setCurrentPalette, numColors, setLoading])

    const changeSwatchColor = (color, id) => {
        setCurrentPalette({
            ...currentPalette,
            [`color${id}`]: color
        })
    }

    const renderSwatches = () => {
        const swatchArr = [];
        for (let i = 1; i <= numColors; i++) {
            swatchArr.push(<Swatch
            key={i}
            id={i}
            color={`rgb(${currentPalette[`color${i}`].r}, ${currentPalette[`color${i}`].g}, ${currentPalette[`color${i}`].b})`}
            changeSwatchColor={changeSwatchColor}
            loading={loading}
        />)
        }
        return swatchArr;
    }

    return (
        <div className="generator">
            <div className="palette-container">
                {renderSwatches()}
            </div>
        </div>
    )
    

} // end of PaletteGenerator class


export default PaletteGenerator;