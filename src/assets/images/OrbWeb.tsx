import { SVGProps, useRef, forwardRef, useImperativeHandle }  from "react"
import { gsap } from 'gsap';

type OrbProps = {
    delay?: number;
    size?: number;
    speed?: number;
}
// eslint-disable-next-line react/display-name, @typescript-eslint/no-unused-vars
const OrbWeb = forwardRef(({ delay, speed, size, ...props}: SVGProps<SVGSVGElement> & OrbProps, ref) => {
    
    const orb = useRef<any>()
    
    // returns api for animating orb
    useImperativeHandle(ref, () =>{
        return {
            moveTo(x: number, y: number) {
                gsap.to(orb.current, { x, y, delay });
            },
            moveToInPlace(x: number, y: number) {
                gsap.to(orb.current, { 
                    x: (i) => x / (i+1) * 100,
                    y: (i) => i*-10*y, 
                    delay,
                    duration: 1 
                });
            },
            appear() {
                gsap.fromTo(orb.current, { opacity: 0 }, { opacity: 1, delay,
                    duration: 1 
                });
            }
        }

    }, [ delay ])    

    
    return (
        <div className="orb-web" 
            ref={orb}
        >
            <svg
            // width={885}
            // height={1017}
            
            viewBox="0 0 885 1017"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            >
            <g opacity={0.5} filter="url(#filter0_f_994_285)">
                <ellipse
                cx={442.318}
                cy={508.5}
                rx={241.988}
                ry={307.797}
                transform="rotate(-0.415226 442.318 508.5)"
                fill="url(#paint0_linear_994_285)"
                />
            </g>
            <defs>
                <filter
                id="filter0_f_994_285"
                x={0.326172}
                y={0.705811}
                width={883.983}
                height={1015.59}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
                >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feGaussianBlur
                    stdDeviation={100}
                    result="effect1_foregroundBlur_994_285"
                />
                </filter>
                <linearGradient
                id="paint0_linear_994_285"
                x1={215.629}
                y1={203.289}
                x2={826.025}
                y2={601.831}
                gradientUnits="userSpaceOnUse"
                >
                <stop offset={0.0092433} stopColor="#FF9C27" />
                <stop offset={0.989098} stopColor="#F26D21" />
                </linearGradient>
            </defs>
            </svg>
        </div>
    )
})

export default OrbWeb;
