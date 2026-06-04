import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { Flip } from 'gsap/Flip'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { CustomEase } from 'gsap/CustomEase'
import { CustomBounce } from 'gsap/CustomBounce'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Observer } from 'gsap/Observer'
import { TextPlugin } from 'gsap/TextPlugin'
import { EasePack } from 'gsap/EasePack'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    ScrambleTextPlugin,
    Flip,
    DrawSVGPlugin,
    MorphSVGPlugin,
    CustomEase,
    CustomBounce,
    CustomWiggle,
    Draggable,
    InertiaPlugin,
    MotionPathPlugin,
    Observer,
    TextPlugin,
    EasePack
  )
}

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrambleTextPlugin,
  Flip,
  DrawSVGPlugin,
  MorphSVGPlugin,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  Draggable,
  InertiaPlugin,
  MotionPathPlugin,
  Observer,
  TextPlugin,
  EasePack,
}
